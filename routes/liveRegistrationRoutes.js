const express = require("express");
const router = express.Router();
const Live = require("../models/Live");
const moment = require("moment-timezone");

router.post("/broadcast/live", async (req, res) => {
  const { username, message } = req.body;

  const now = moment().tz("Asia/Manila");

  // const startLive = moment(now.format("HH:mm:ss"), "HH:mm:ss");

  try {
    const newLive = await Live.create({
      username,
      message,
      startLive: now.format("HH:mm:ss")
    });
    res
      .status(201)
      .json({ success: true, message: "Broadcast created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
