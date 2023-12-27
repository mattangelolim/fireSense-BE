const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Case = require("../models/Case");
const ARIMA = require('arima');
const moment = require("moment");

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

router.get("/moving-average/text", async (req, res) => {
  const windowSize = 3;

  try {
    const movingAveragesByDistrict = {};

    // Loop through each district (1 to 6)
    for (let district = 1; district <= 6; district++) {
      let totalMovingAverage = 0;

      // Loop through each year (2017 to 2024)
      for (let year = 2017; year <= 2023; year++) {
        const cases = await Case.findAll({
          where: {
            year: year,
            district: district,
          },
        });

        const aggregatedData = {};
        cases.forEach((caseData) => {
          const month = caseData.month;
          if (aggregatedData[month]) {
            aggregatedData[month] += caseData.count;
          } else {
            aggregatedData[month] = caseData.count;
          }
        });

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

        // Sum up moving averages for each district
        totalMovingAverage += movingAverages.reduce((sum, value) => sum + value, 0);

        // Calculate the average of moving averages for the current year and district
        const averageMovingAverage = totalMovingAverage / (year - 2017 + 1);

        if (!movingAveragesByDistrict[district]) {
          movingAveragesByDistrict[district] = {};
        }

        movingAveragesByDistrict[district][year] = Math.round(averageMovingAverage);
      }
    }

    // Perform text analysis and add analysis to the response
    const analysisByDistrict = {};

    for (const district in movingAveragesByDistrict) {
      analysisByDistrict[district] = analyzeTrend(movingAveragesByDistrict[district]);
    }

    res.json({ analysisByDistrict });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/moving-average/prediction", async (req, res) => {

  try {
    const casesPerYear = await Case.findAll({
      where: {
        year: {
          [Op.lte]: "2023",
        },
      },
    });

    console.log(casesPerYear)

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
      p: 4,
      d: 1,
      q: 2,
      verbose: false,
    }).train(data);

    // Predict next value
    const [pred, errors] = arima.predict(5);

    const prediction = pred.map((value) => Math.round(value));

    console.log("ARIMA forecast:", prediction);

    const combinedArray = [...data, ...prediction];

    res.json(combinedArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Function to analyze the trend based on moving averages
function analyzeTrend(movingAverages) {
  const trendAnalysis = {};

  for (const year in movingAverages) {
    const currentYearValue = movingAverages[year];
    const previousYear = parseInt(year) - 1;
    const previousYearValue = movingAverages[previousYear];

    if (currentYearValue > previousYearValue) {
      trendAnalysis[year] = "Increasing";
    } else if (currentYearValue < previousYearValue) {
      trendAnalysis[year] = "Decreasing";
    } else {
      trendAnalysis[year] = "Stable";
    }
  }

  return trendAnalysis;
}

module.exports = router;

