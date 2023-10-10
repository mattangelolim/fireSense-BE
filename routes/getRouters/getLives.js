const express = require("express");
const router = express.Router();
const Live = require("../../models/Live");

router.get("/show/live", async (req, res) => {
  try {
    const lives = await Live.findAll();
    res.status(200).json({ success: true, data: lives });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/show/live/last", async (req, res) => {
  try {
    const lastLive = await Live.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (!lastLive) {
      return res
        .status(404)
        .json({ success: false, message: "No live data found" });
    }

    res.status(200).json({ success: true, data: lastLive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
