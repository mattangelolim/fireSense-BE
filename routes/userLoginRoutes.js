const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email, password, status: "Active" },
    });

    if (user) {
      return res.json({ user });
    } else {
      return res.json({
        success: false,
        message: "Invalid email, password, or inactive account",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
