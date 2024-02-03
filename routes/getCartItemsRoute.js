const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const Product = require("../model/product");
const User = require("../model/user");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.get("/getCartItems", async (req, res) => {
  try {
    const userId = req.query.userId;
    // const cartItemsData = req.query.cartItemsData
    console.log(userId);

    // Validate userId to ensure it's a valid MongoDB ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId parameter" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = user.userCart.cartItems;
    // console.log(cartItems);
    const products = await Promise.all(
      cartItems.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId);

        if (!product) {
          // Handle the case where a product is not found
          return null;
        }

        return {
          ...product.toObject(),
          quantity: cartItem.quantity,
        };
      })
    );

    // console.log(products.length);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error getting CartItems ", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
