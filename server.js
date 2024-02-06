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
const Product = require("./model/product");

// import router files
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

const app = express();
const PORT = process.env.PORT || 5000;

// middleware to parse json in the request body
app.use(bodyParser.json());
app.options("*", cors()); // Enable preflight requests for all routes

// Enable CORS for for all routes
app.use(
  cors({
    origin: "https://65b536ce52f5380008c3cc41--marktio.netlify.app",
  })
);

// use routes files
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

//connect to mongodb database
const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log(`MongoDB connected`);
      // console.log(process.env.MONGO_URI);
    });
  } catch (err) {
    console.log("Failed to connect to mongodb", err, err.message);
    process.exit(1);
  }
};

// create a new product in the products collection....route
app.post("/api/addproduct", async (req, res) => {
  try {
    const formData = req.body;
    const product = await Product.create(formData);
    // console.log("data to be sent", formData, product)
    res.status(201).json({ message: "product successfully created" });
    console.log("New product created successfully", product);
  } catch (err) {
    console.error("Error creating new product!", err.message);
  }
});

// Get all products from the database....route
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).json(products);
      // console.log("All Product found", products)
    }
  } catch (err) {
    console.log("Failed to get blog:", err.message);
  }
});

// Get specific product details from the database....route
app.get("/api/productDetail/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      // console.log("Product found", product);
      res.status(200).json(product);
    } else {
      console.log("Product not found");
      res.status(404).json({ message: "product not found" });
    }
  } catch (err) {
    console.log("Error getting product:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// set deploy property in product collection to true or false
app.put("/api/deployProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const result = await Product.findByIdAndUpdate(productId, {
      deploy: !product.deploy,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log("Failed to set product deployment property", err.message);
  }
});

// Get all Products that deploy property is equal to "ture" from the database....route
app.get("/api/productsDeployed", async (req, res) => {
  try {
    const products = await Product.find({ deploy: true });
    if (products) {
      res.status(200).json(products);
      // console.log("All Product found", products);
    }
  } catch (err) {
    console.log("Failed to get all products:", err.message);
  }
});

// Get specific product details where deploy property is true from the database....route
app.get("/api/deployedProductDetail/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    const productDeployed = product.deploy;
    if (productDeployed) {
      // console.log("Product found", product);
      res.status(200).json(product);
    }
    // else {
    //   console.log("Product not found");
    //   res.status(409).json({ message: "product not found" });
    // }
  } catch (err) {
    console.log("Error getting product:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// check if the product is alredy deployed or not
app.get("/api/checkDeploy/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json(product.deploy);
  } catch (err) {
    console.error("Failed to check product deploy value", err.message);
  }
});

// Delete product from the database by Id....route
app.post("/api/deleteProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to delete product", err.message);
  }
});

// Update product from the database by Id....route
app.put("/api/updateProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productToUpdate = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productToUpdate,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update product", message: err.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
