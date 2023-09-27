const express = require("express");
const router = express.Router();
const Advisory = require("../models/Advisory");

// Route to create a new advisory
router.post("/advisory", async (req, res) => {
  const { announcement, expirationDate } = req.body;

  try {
    const newAdvisory = await Advisory.create({ announcement, expirationDate });
    res.status(201).json({ advisory: newAdvisory });
  } catch (error) {
    console.error("Error creating advisory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
