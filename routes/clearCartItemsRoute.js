const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.delete("/clear_cart_items", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear the cart items
    user.userCart.cartItems = [];

    // Save the updated user object
    const updatedUser = await user.save();

    // Log the cleared cart items
    console.log("Cleared cart items:", updatedUser.userCart.cartItems);

    res.status(200).json({ message: "Cart items cleared" });
  } catch (err) {
    console.error("Error clearing cart items: ", err.message);
    res
      .status(500)
      .json({ error: "Error clearing cart items", message: err.message });
  }
});

// Export router
module.exports = router;
