const express = require("express");
const router = express.Router();
const Comment = require("../models/Comments");

router.get("/live/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({ attributes: ['username', 'comment'] });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
