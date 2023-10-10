const express = require("express");
const router = express.Router();
const Live = require("../models/Live");

router.post("/live/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const live = await Live.findByPk(id);

    if (!live) {
      return res
        .status(404)
        .json({ success: false, message: "Live broadcast not found" });
    }

    await live.destroy();

    res
      .status(200)
      .json({ success: true, message: "Live broadcast deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
