// import mongoose
// Define the category Schema field here
// Create and export the category model Schema

// import mongoose
const mongoose = require("mongoose");

//  Definde he product Schema field here
const categorySchema = new mongoose.Schema({
  deploy: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  noItems: {
    type: Number,
  },
  categoryImageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// create and export the Category model schema
const Category = mongoose.model("Categories", categorySchema);
module.exports = Category;
