const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const p = Math.floor(Math.random() * (i + 1));
    [array[i], array[p]] = [array[p], array[i]];
  }
  return array;
}

// Get all Products that deploy property is equal to "ture" from the database....route
router.get("/productsDeployed", async (req, res) => {
  try {
    const products = await Product.find({ deploy: true });
    if (products) {
      // Shuffle the array of products
      const shuffledProducts = shuffleArray(products);

      res.status(200).json(shuffledProducts);
      console.log("All Product found");
    }
  } catch (err) {
    console.log("Failed to get all products:", err, err.message);
    res.status(500).json({ error: "Failed to get products" });
  }
});

// Export router
module.exports = router;
