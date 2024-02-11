const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

// Set deploy property in category collection to true or false
router.put("/deployCategory/:name", async (req, res) => {
  try {
    const categoryName = req.params.name;
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }

    await Category.findOneAndUpdate(
      { name: categoryName },
      { deploy: !category.deploy }
    );
    // console.log(category.deploy);
    res.sendStatus(200);
  } catch (err) {
    console.error("Failed to set product deployment property", err.message);
    res.sendStatus(500); // Send a server error status
  }
});

// Export router
module.exports = router;
