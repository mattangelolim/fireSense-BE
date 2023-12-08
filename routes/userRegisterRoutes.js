const express = require("express");
const router = express.Router();
const { User } = require("../models/Users");
const Otp = require("../models/Otp");
const twilio = require("twilio");

const accountSid = "AC5e673e372afd9c9374b6e5c4ff0ac3f6";
const authToken = "e6a656435009f4ca8544a746d65ebe21";
const client = twilio(accountSid, authToken);

const OTPMap = {};

router.post("/register", (req, res) => {
  const { email, phone, name, district, password, user_type } = req.body;

  User.create({
    email,
    phone,
    name,
    district,
    password,
    user_type,
  })
    .then((user) => {
      // generate and send OTP
      const otp = generateOTP();

      client.messages
        .create({
          body: `Your OTP for registration: ${otp}`,
          from: "+12295261907", // Twilio phone number
          to: `+${phone}`, // User's phone number
        })
        .then((message) => {
          Otp.create({ code: otp, userId: user.email }) // Save OTP to the database
            .then(() => {
              // Store the OTP temporarily for verification
              OTPMap[phone] = otp;
              res.json({ message: "OTP sent successfully" });
            })
            .catch((error) => {
              console.error("Error saving OTP to database:", error);
              res.status(500).json({ error: "Error saving OTP to database" });
            });
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          res.status(500).json({ error: "Error sending OTP" });
        });
    })
    .catch((error) => {
      if (error.original && error.original.code === "ER_DUP_ENTRY") {
        res.status(400).json({ error: "Email already registered" });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
      }
    });
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = router;
