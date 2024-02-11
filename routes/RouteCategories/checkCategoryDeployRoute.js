const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

// check if the product is alredy deployed or not
router.get("/checkCategoryDeploy/:name", async (req, res) => {
  try {
    const categoryName = req.params.name;
    // console.log(categoryName);
    const category = await Category.findOne({ name: categoryName });
    // const deployed = category;
    // console.log(category.deploy);
    res.status(200).json(category.deploy);
  } catch (err) {
    console.error("Failed to check category deploy value", err.message);
  }
});

// Export router
module.exports = router;
