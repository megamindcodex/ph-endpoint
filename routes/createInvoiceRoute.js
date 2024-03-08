require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/user");
const Product = require("../model/product");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.post("/crypto_invoice_payment", async (req, res) => {
  const axios = require("axios");
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const cartItemsData = user.userCart.cartItems;
    // console.log(cartItemsData);

    const products = await Promise.all(
      cartItemsData.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId);
        const subTotal = cartItem.quantity * product.price;
        return {
          ...product.toObject(),
          quantity: cartItem.quantity,
          subTotal: subTotal,
        };
      })
    );
    console.log(products);

    // console.log(products);
    const url = "https://api.oxapay.com/merchants/request";
    const API_KEY = process.env.API_KEY;
    const productPrice = products.map((product) => product.price);
    // console.log(productPrice);
    const total = products.reduce(
      (accumulator, currentProduct) => accumulator + currentProduct.subTotal,
      0
    );

    console.log(total);

    const data = {
      amount: total,
      // merchant: process.env.API_KEY,
      merchant: "sandbox",
      currency: "USD",
      lifeTime: 30,
      feePaidByPayer: 0,
      underPaidCover: 2.5,
      callbackUrl: "https://example.com/callback",
      returnUrl: "https://example.com/success",
      description: "test description",
      orderId: uuidv4(),
      email: "emmanvictor71@gmail.com",
    };
    const response = await axios.post(url, data);
    res.status(200).json({ url: response.data.payLink });
    console.log(response.data.payLink);
    console.log(response.data);
  } catch (err) {
    console.log("Error creating invoice payment", err, err.message);
  }
});

module.exports = router;
