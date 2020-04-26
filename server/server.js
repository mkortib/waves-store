const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const app = express();
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');
const { Payment } = require('./models/payment');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//==================
//	   Products
//==================

// BY ARRIVAL - api/product/acricles?sortBy=createdAt&order=desc&limit=4
// BY SELL - api/product/acricles?sortBy=sold&order=desc&limit=4&skip=5

app.get('/api/product/articles', (req, res) => {
    const order = req.query.order ? req.query.order : 'asc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? +req.query.limit : 100;

    Product.find()
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .limit(limit)
        .then((articles) => res.send(articles))
        .catch((err) => res.status(400).send(err));
});

// api/product/acricles?id=26162,2112,2134&type=array
app.get('/api/product/articles_by_id', (req, res) => {
    const { type } = req.query;
    let items = req.query.id;

    if (type === 'array') {
        const ids = req.query.id.split(',');
        items = [];
        items = ids.map((item) => mongoose.Types.ObjectId(item));
    }

    Product.find({ _id: { $in: items } })
        .populate('brand')
        .populate('wood')
        .then((docs) => {
            res.status(200).send(docs);
        })
        .catch((error) => res.json(error));
});

app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((error, doc) => {
        if (error) {
            const errResponse = { success: false, error };

            return res.json(errResponse);
        }

        const prodResponse = { success: true, article: doc };

        res.status(200).json(prodResponse);
    });
});

app.post('/api/product/shop', (req, res) => {
    const order = req.body.order ? req.body.order : 'desc';
    const sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    const limit = req.body.limit ? parseInt(req.body.limit, 10) : 100;
    const skip = parseInt(req.body.skip, 10);
    let findArgs = {};

    // eslint-disable-next-line no-restricted-syntax
    for (let key in req.body.filters) {
        if (req.body.filters[key].length) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    findArgs.publish = true;

    Product.find(findArgs)
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) {
                return res.status(400).send(err);
            }

            const foundProducts = { size: articles.length, articles };

            res.status(200).json(foundProducts);
        });

    res.status(200);
});

//==================
//	    WOODS
//==================

app.post('/api/product/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((error, doc) => {
        if (error) {
            const errResponse = { success: false, error };

            return res.json(errResponse);
        }

        const woodResponse = { success: true, wood: doc };

        res.status(200).send(woodResponse);
    });
});

app.get('/api/product/woods', (req, res) => {
    Wood.find({})
        .then((woods) => res.status(200).send(woods))
        .catch((error) => res.status(400).send(error));
});

//==================
//	    BRANDS
//==================

app.post('/api/user/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if (err) {
            const errResponse = { success: false, error: err };

            return res.json(errResponse);
        }

        const brandResponse = { success: true, brand: doc };

        res.status(200).json(brandResponse);
    });
});

app.get('/api/product/brands', (req, res) => {
    Brand.find({})
        .then((brands) => res.status(200).send(brands))
        .catch((err) => res.status(400).send(err));
});

//==================
//	    USERS
//==================

app.get('/api/users/auth', auth, (req, res) => {
    const { email, name, lastname, role, cart, history } = req.user;

    const authResponse = {
        isAdmin: role !== 0,
        isAuth: true,
        email,
        name,
        lastname,
        role,
        cart,
        history,
    };

    res.status(200).json(authResponse);
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) {
            const errResponse = { success: false, error: err };

            return res.json(errResponse);
        }

        const successResponse = { success: true };

        return res.status(200).json(successResponse);
    });
});

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            const noUserResponse = {
                loginSuccess: false,
                message: 'Auth failed, email not found',
            };

            return res.json(noUserResponse);
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                const badPasswordResponse = {
                    loginSuccess: false,
                    message: 'Wrong password',
                };

                return res.json(badPasswordResponse);
            }

            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).send(err);
                }

                const loginResponse = { loginSuccess: true };

                res.cookie('w_auth', user.token)
                    .status(200)
                    .json(loginResponse);
            });
        });
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' })
        .then((doc) => {
            const docResponse = { success: true };

            return res.status(200).send(docResponse);
        })
        .catch((err) => {
            const noDocResponse = { success: false, err };

            return res.json(noDocResponse);
        });
});

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(
        req.files.file.path,
        (result) => {
            const imagesInfo = {
                public_id: result.public_id,
                url: result.url,
            };
            res.status(200).send(imagesInfo);
        },
        {
            public_id: `${Date.now()}`,
            resourse_type: 'auto',
        }
    );
});

app.get('/api/users/removeimage', auth, admin, (req, res) => {
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id, (error, result) => {
        if (error) {
            return res.json({ success: false, error });
        }

        return res.status(200).send({ success: true, result });
    });
});

app.post('/api/users/addToCart', auth, (req, res) => {
    User.findOne({ _id: req.user._id }).then((user) => {
        let dublicate = false;

        user.cart.forEach((item) => {
            if (item.id.toString() === req.query.productId) {
                dublicate = true;
            }
        });

        if (dublicate) {
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                    'cart.id': mongoose.Types.ObjectId(req.query.productId),
                },
                { $inc: { 'cart.$.quantity': 1 } },
                { new: false }
            )
                .then((user) => res.status(200).json(user.cart))
                .catch((err) => res.json({ sucess: false, err }));
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true }
            )
                .then((user) => res.status(200).json(user.cart))
                .catch((err) => res.json({ sucess: false, err }));
        }
    });
});

app.get('/api/users/removeFromCart', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } },
        },
        { new: true }
    )
        .then((user) => {
            const { cart } = user;
            const array = cart.map((item) => mongoose.Types.ObjectId(item.id));

            Product.find({ _id: { $in: array } })
                .populate('brand')
                .populate('wood')
                .exec((err, cartDetail) => {
                    const response = {
                        cartDetail,
                        cart,
                    };

                    return res.status(200).json(response);
                });
        })
        .catch((err) => res.json({ success: false, err }));
});

app.post('/api/users/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {};

    // user history
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID,
        });
    });

    // Payment dash
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email,
    };
    transactionData.data = req.body.paymentData;
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history }, $set: { cart: [] } },
        { new: true }
    )
        .then((user) => {
            const payment = new Payment(transactionData);
            payment
                .save()
                .then((payment) => {
                    let products = [];

                    payment.product.forEach((item) => {
                        products.push({ id: item.id, quantity: item.quantity });
                    });

                    async.eachSeries(
                        products,
                        (item, callback) => {
                            Product.update(
                                { _id: item.id },
                                { $inc: { sold: item.quantity } },
                                { new: false },
                                callback
                            );
                        },
                        (err) => {
                            if (err) {
                                return res.json({ success: false, err });
                            }

                            const successMessage = {
                                success: true,
                                cart: user.cart,
                                cartDetail: [],
                            };

                            res.status(200).json(successMessage);
                        }
                    );
                })
                .catch((error) => res.json({ success: false, error }));
        })
        .catch((error) => res.json({ success: false, error }));
});

app.post('/api/users/update_profile', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: req.body },
        { new: true }
    )
        .then((doc) => res.status(200).send({ success: true }))
        .catch((error) => res.json({ success: false, error }));
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
