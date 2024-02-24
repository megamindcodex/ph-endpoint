const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.post("/addToCart", async (req, res) => {
  try {
    const userId = req.body.userId;
    const productData = req.body.productData;
    // console.log("productData:" ,productData)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming userCart is an object with a cartItems array
    user.userCart.cartItems.push(productData);

    // Save the updated user
    await user.save();

    // console.log("Product ID added to user cart");
    res.status(200).json({
      isItemInCart: true,
      message: "Product added to cart successfully",
      productData,
    });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export router
module.exports = router;
