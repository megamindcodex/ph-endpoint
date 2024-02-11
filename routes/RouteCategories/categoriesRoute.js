const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories) {
      res.status(200).json(categories);
    }
  } catch (err) {
    console.log("Error getting All categories");
  }
});

// Export router
module.exports = router;
