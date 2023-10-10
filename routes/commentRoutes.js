const express = require("express");
const router = express.Router();
const Comment = require("../models/Comments");

router.post("/comment", async (req, res) => {
  const { username, comment } = req.body;

  try {
    const newComment = await Comment.create({
      username,
      comment,
    });
    res
      .status(201)
      .json({ success: true, message: "Comment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
