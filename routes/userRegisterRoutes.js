const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Otp = require("../models/Otp");
const twilio = require("twilio");

const accountSid = "ACca39c5090e29044ba0e50afca61bc769";
const authToken = "d395475d8e28811ca6303297b7f7ac30";
const client = twilio(accountSid, authToken);

const OTPMap = {};

router.post("/register", (req, res) => {
  const { email, phone, name, district, password } = req.body;

  User.create({
    email,
    phone,
    name,
    district,
    password,
  })
    .then((user) => {
      // Now that the user is created, generate and send OTP
      const otp = generateOTP();

      client.messages
        .create({
          body: `Your OTP for registration: ${otp}`,
          from: "+17855092002", // Twilio phone number
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
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    });
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = router;
