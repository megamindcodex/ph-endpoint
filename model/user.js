// import mongoose
const mongoose = require("mongoose");

// import Product model
const Product = require("./product");

// Define the user Schema field here
const userSchema = new mongoose.Schema({
  verified: {
    type: Boolean,
    default: false,
  },
  login: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  addressBook: {
    firstName: {
      type: String,
      default: null,
    },
    LastName: {
      type: String,
      default: null,
    },
    prefix: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    deliveryAddress: {
      type: String,
      default: null,
    },
    additionalInfo: {
      type: String,
      default: null,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userCart: {
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    subtotal: {
      type: Number,
      default: 0,
    },
  },
});

// Create and export the user model Schema
const User = mongoose.model("User", userSchema);

module.exports = User;
