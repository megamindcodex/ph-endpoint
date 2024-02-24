const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.get("/getProductQuantity", async (req, res) => {
  try {
    const userId = req.query.userId; // Use req.query to get query parameters
    const productId = req.query.productId;
    console.log(productId);

    const user = await User.findById(userId);
    const cartItems = user.userCart.cartItems;
    // console.log(user);
    // console.log(cartItems);

    // Find the item in cartItems array with the matching productId
    const item = cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (item) {
      const productQuantity = item.quantity;
      res.status(200).json(productQuantity);
      // console.log(productQuantity);
    } else {
      console.log("product not found");
      res.status(404).json({ message: "Product quantity not found" });
    }
  } catch (err) {
    console.error("Failed to get product quantity", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export router
module.exports = router;
