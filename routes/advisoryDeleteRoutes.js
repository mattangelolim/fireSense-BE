const express = require("express");
const router = express.Router();
const Advisory = require("../models/Advisory");

router.post("/advisory/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const live = await Advisory.findByPk(id);

    if (!live) {
      return res
        .status(404)
        .json({ success: false, message: "Advisory not found" });
    }

    await live.destroy();

    res
      .status(200)
      .json({ success: true, message: "Advisory deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
