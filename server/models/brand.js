const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100,
    },
    description: {
        required: true,
        type: String,
        maxlength: 300,
    },
    image: {
        type: String,
        default: '',
    },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand };
