const express = require("express");
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
    // console.log(cartItemsData);

    const user = await User.findById(userId);

    const cartItems = user.userCart.cartItems;
    console.log(cartItems);
    const products = await Promise.all(
      cartItems.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId);

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
