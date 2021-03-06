const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const SALT_I = 10;

require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        uniq: 1,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100,
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
    resetToken: {
        type: String,
    },
    resetTokenExp: {
        type: Number,
    },
});

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, (err, salt) => {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) {
                    return next(error);
                }

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save((err, user) => {
        if (err) {
            return cb(err);
        }

        cb(null, user);
    });
};

userSchema.methods.generateResetToken = function (cb) {
    const user = this;

    crypto.randomBytes(20, function (err, buffer) {
        let token = buffer.toString('hex');
        let today = moment().startOf('day').valueOf();
        let tomorrow = moment(today).endOf('day').valueOf();

        user.resetToken = token;
        user.resetTokenExp = tomorrow;

        user.save()
            .then((user) => cb(null, user))
            .catch((error) => cb(error));
    });
};

userSchema.statics.findByToken = function (token, cb) {
    const user = this;

    jwt.verify(token, process.env.SECRET, (err, decode) => {
        user.findOne({ _id: decode, token })
            .then((person) => {
                cb(null, person);
            })
            .catch((err) => cb(err));
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
