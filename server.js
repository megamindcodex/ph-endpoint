// middleware to parse json in the request body

// Enable CORS for for all routes

// connect to mongodb database

// create a new blog in the blog collection....route

// Get all blogs from the database....route

// Get specific blog details from the database....route

// Delete blog from the database by Id....route

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

// import router files
const addProductRoute = require("./routes/addProductRoute");
const productsRoute = require("./routes/productsRoute");
const productsByCategoryRoute = require("./routes/productsByCategoryRoute");
const productDetailRoute = require("./routes/productDetailRoute");
const deployProductRoute = require("./routes/deployProductRoute");
const deployedProductDetailRoute = require("./routes/deployedProductDetailRoute");
const productsDeployedRoute = require("./routes/productsDeployedRoute");
const checkDeployRoute = require("./routes/checkDeployRoute");
const deleteProductRoute = require("./routes/deleteProductRoute");
const updateProductRoute = require("./routes/updateProductRoute");
const signUpRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const profileRoute = require("./routes/profileRoute");
const allUserRoute = require("./routes/allUserRoute");
const sendEmailRoute = require("./routes/sendEmailRoute");
const addToCartRoute = require("./routes/addToCartRoute");
const getCartItemsIdRoute = require("./routes/getCartItemsIdRoute");
const getCartItemsRoute = require("./routes/getCartItemsRoute");
const sumAllPriceRoute = require("./routes/sumAllPriceRoute");
const deleteCartItemRoute = require("./routes/deleteCartItemRoute");
const checkOutRoute = require("./routes/checkOutRoute");
const checkItemInCartRoute = require("./routes/checkItemInCartRoute");
const addQuantityRoute = require("./routes/addQuantityRoute");
const reduceQuantityRoute = require("./routes/reduceQuantityRoute");
const getQuantityRoute = require("./routes/getQuantityRoute");
const clearCartItemsRoute = require("./routes/clearCartItemsRoute");

const addCategoryRoute = require("./routes/RouteCategories/addCategoryRoute");
const categoriesRoute = require("./routes/RouteCategories/categoriesRoute");
const categoryDetailRoute = require("./routes/RouteCategories/categoryDetailRoute");
const deployCategoryRoute = require("./routes/RouteCategories/deployCategoryRoute");
const checkCategoryDeployRoute = require("./routes/RouteCategories/checkCategoryDeployRoute");
const updateCategoryRoute = require("./routes/RouteCategories/updateCategoryRoute");
const deployedCategoriesRoute = require("./routes/RouteCategories/deployedCategoriesRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware to parse json in the request body
app.use(bodyParser.json());
app.options("*", cors()); // Enable preflight requests for all routes

// Enable CORS for for all routes
app.use(cors());

// use routes files
app.use("/api", addProductRoute);
app.use("/api", productsRoute);
app.use("/api", productDetailRoute);
app.use("/api", deployProductRoute);
app.use("/api", deployedProductDetailRoute);
app.use("/api", productsDeployedRoute);
app.use("/api", checkDeployRoute);
app.use("/api", deleteProductRoute);
app.use("/api", updateProductRoute);
app.use("/api", signUpRoute);
app.use("/api", loginRoute);
app.use("/api", profileRoute);
app.use("/api", allUserRoute);
app.use("/api", sendEmailRoute);
app.use("/api", addToCartRoute);
app.use("/api", getCartItemsIdRoute);
app.use("/api", getCartItemsRoute);
app.use("/api", sumAllPriceRoute);
app.use("/api", deleteCartItemRoute);
app.use("/api", checkOutRoute);
app.use("/api", checkItemInCartRoute);
app.use("/api", addQuantityRoute);
app.use("/api", reduceQuantityRoute);
app.use("/api", getQuantityRoute);
app.use("/api", clearCartItemsRoute);
app.use("/api", addCategoryRoute);
app.use("/api", categoriesRoute);
app.use("/api", categoryDetailRoute);
app.use("/api", deployCategoryRoute);
app.use("/api", checkCategoryDeployRoute);
app.use("/api", updateCategoryRoute);
app.use("/api", deployedCategoriesRoute);
app.use("/api", productsByCategoryRoute);

//connect to mongodb database
const dbURI = process.env.DB_URI;

const connectDB = async () => {
  try {
    const conn = mongoose.connect(dbURI).then(() => {
      console.log(`MongoDB connected`);
      console.log(process.env.DB_URI);
    });
  } catch (err) {
    console.log("Failed to connect to mongodb", err, err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
