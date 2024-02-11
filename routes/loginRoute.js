const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");
const nodemailer = require("nodemailer");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

// Login User
router.post("/loginUser", async (req, res) => {
  try {
    const loginData = req.body;

    if (!loginData === undefined) {
      console.log("formData is empty");
      console.log(loginData);
    }

    errorMsg = [];

    const user = await User.findOne(loginData);
    if (!user) {
      errorMsg.push("invalid login credentials!");
    }

    if (errorMsg.length > 0) {
      console.log(errorMsg);
      res.status(404).json({ errors: errorMsg });
      return; // Exit the function to prevent further execution
    }
    const userId = user._id;

    // Send message to user's email if user is found
    if (user) {
      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
          user: "nodemailer2446@gmail.com",
          pass: "E6B24B9C4458D0CD13339DF23BFFC9D9E45F",
        },
      });

      const messageOptions = {
        from: "nodemailer2446@gmail.com",
        to: user.email,
        subject: "just a Login mailer comfirmation",
        text: "Plaintext version of the message",
        html: `<p>Hello ${user.userName}, just testing this nodemailer with elastic email, only to see that its a pain in the ass</p>`,
      };

      const info = await transporter.sendMail(messageOptions);
      console.log("email sent to:", user.email);
    }

    // Send the response after checking for the user
    res.status(200).json({ _id: userId });
    // console.log("user logged in", user);
  } catch (err) {
    console.error("Error finding user", err.message);
    res.status(500).json({ error: "Error finding user" });
  }
});

// Export router
module.exports = router;
