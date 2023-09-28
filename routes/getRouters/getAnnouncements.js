const express = require("express");
const router = express.Router();
const Advisory = require("../../models/Advisory");

// Route to get announcements based on expiration date
router.get("/announcements", async (req, res) => {
  try {
    const currentDate = new Date();
    const announcement = await Advisory.findAll({
      expirationDate: { $gte: currentDate },
    });

    res.status(200).json({ announcement });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
