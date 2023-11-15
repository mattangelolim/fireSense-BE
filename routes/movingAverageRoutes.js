const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Case = require("../models/Case");
const ARIMA = require('arima');

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

router.get("/moving-average/prediction", async (req, res) => {
  try {
    const casesPerYear = await Case.findAll();
    const totalCountsPerYear = {};

    // Loop through cases and increment total counts
    casesPerYear.forEach((caseData, index) => {
      const year = caseData.year;
      const count = caseData.count;

      // Initialize count if not already present for the year
      totalCountsPerYear[year] = totalCountsPerYear[year] || { count: 0 };

      // Increment total count
      totalCountsPerYear[year].count += count;
    });

    const countsOnly = Object.values(totalCountsPerYear).map(({ count }) => ({ count }));

    const data = countsOnly.map(({ count }) => count);

    const arima = new ARIMA({
      p: 2,
      d: 1,
      q: 2,
      verbose: false
    }).train(data);
    
    // Predict next value
    const [pred, errors] = arima.predict(3);
    
    console.log("ARIMA forecast:", pred);


    res.json(countsOnly)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
