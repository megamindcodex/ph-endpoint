require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");
const Product = require("../model/product");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const cartItemsData = user.userCart.cartItems;
    const products = await Promise.all(
      cartItemsData.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId);
        return {
          ...product.toObject(),
          quantity: cartItem.quantity,
        };
      })
    );

    // console.log(products)

    // Create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.productImageURL],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      })),
      success_url: "https://marktio.netlify.app/payment-successfull",
      cancel_url: "http://localhost:5175/",
      // success_url: "http://localhost:5173/payment-successfull",
      // cancel_url: "http://localhost:5175/",
    });

    res.status(200).json({ url: session.url });
    // console.log(session);
  } catch (err) {
    res.status(500).json({ error: "Error creating checkout session:", err });
    console.error("Error creating checkout session:", err);
  }
});

module.exports = router;
