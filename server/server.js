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

// Middlewares
const { auth } = require('./middleware/auth');

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
