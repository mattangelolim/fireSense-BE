const express = require("express");
const router = express.Router();
const Live = require("../models/Live");
const moment = require("moment-timezone");

router.post("/broadcast/update", async (req, res) => {
  const { id } = req.body;

  try {
    const live = await Live.findOne({
      where: {
        id: id,
      },
    });

    if (!live) {
      return res
        .status(404)
        .json({ success: false, message: "Live broadcast not found" });
    }

    // Set endLive to current time in PH timezone
    const now = moment().tz("Asia/Manila");

    // Convert startLive and endLive to moment objects
    const startLiveTime = moment(live.startLive, "HH:mm:ss");
    const endLiveTime = moment(now.format("HH:mm:ss"), "HH:mm:ss");

    // Calculate duration
    const durationInMilliseconds = endLiveTime.diff(startLiveTime);
    const duration = moment.utc(durationInMilliseconds).format("HH:mm:ss");

    const updatedLive = await live.update(
      { endLive: now.format("HH:mm:ss"), duration },
      {
        where: {
          id: id,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Timestamp updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
