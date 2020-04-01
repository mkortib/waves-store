const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

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
      const errRespnse = { success: false, error: err };

      return res.json(errRespnse);
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

        res.cookie('w_auth', user.token).status(200).json(loginResponse);
      });
    });
  });
});

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' })
    .then((doc) => {
      const docResponse = { sucess: true };

      return res.status(200).send(docResponse);
    })
    .catch((err) => {
      const noDocResponse = { success: false, err };

      return res.json(noDocResponse);
    });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
