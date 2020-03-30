const { User } = require('../models/user');

const auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      const noUser = { isAuth: false, error: true };

      return res.json(noUser);
    }

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = { auth };
