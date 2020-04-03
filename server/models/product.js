const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    shipping: {
      type: Boolean,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    wood: {
      type: Schema.Types.ObjectId,
      ref: 'Wood',
      required: true,
    },
    frets: {
      required: true,
      type: Number,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
