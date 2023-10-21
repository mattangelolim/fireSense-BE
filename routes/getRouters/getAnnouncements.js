const express = require("express");
const router = express.Router();
const Advisory = require("../../models/Advisory");
const moment = require('moment-timezone');
const { Op } = require("sequelize");

// Route to get announcements based on expiration time 
router.get("/announcements", async (req, res) => {
  try {
    const CurrentDate = moment().tz('Asia/Manila');
    console.log(CurrentDate);

    const announcements = await Advisory.findAll({
      where: {
        expirationDate: {
          [Op.gte]: CurrentDate
        }
      },
      order: [
        ['id', 'DESC']
      ]
    });

    res.status(200).json({ announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all/announcements", async (req, res) => {
  try {
    const announcements = await Advisory.findAll({
      order: [
        ['id', 'DESC']
      ]
    });

    res.status(200).json({ announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
