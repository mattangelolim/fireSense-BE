const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Case = require("../models/Case");

router.get("/moving-average", async (req, res) => {
  const year = req.query.year;
  const district = req.query.district;
//   the "window size" refers to the number of data points used to calculate the average at each step.
  const windowSize = 3

  try {
    const cases = await Case.findAll({
      where: {
        year: year,
        district: district
      },
    });

    // Create an object to aggregate counts by month
    const aggregatedData = {};

    cases.forEach((caseData) => {
      const month = caseData.month;
      if (aggregatedData[month]) {
        aggregatedData[month] += caseData.count;
      } else {
        aggregatedData[month] = caseData.count;
      }
    });

    // Convert aggregated data back to an array
    const aggregatedArray = Object.keys(aggregatedData).map((month) => ({
      month: month,
      count: aggregatedData[month],
    }));

    const movingAverages = [];
    for (let i = 0; i <= aggregatedArray.length - windowSize; i++) {
      const window = aggregatedArray.slice(i, i + windowSize);
      const average =
        window.reduce((sum, value) => sum + value.count, 0) / windowSize;
      movingAverages.push(Math.round(average));
    }

    res.json({ movingAverages });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
