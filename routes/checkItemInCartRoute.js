require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");
const Product = require("../model/product");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.get("/checkItemInCart", async (req, res) => {
  const userId = req.query.userId;
  const productId = req.query.productId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = user.userCart.cartItems;

    const isItemInCart = cartItems.some((item) =>
      item.productId.equals(productId)
    );

    console.log(isItemInCart);

    res.status(200).json(isItemInCart);
  } catch (error) {
    console.error("Error checking item in cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
