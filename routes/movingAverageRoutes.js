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

router.get("/moving-average/prediction", async (req,res) =>{
  try {
    const casesPerYear = await Case.findAll()
    const totalCountsPerYear = {};

    // Loop through cases and increment total counts
    casesPerYear.forEach((caseData) => {
      const year = caseData.year;
      const count = caseData.count;

      // Initialize count if not already present for the year
      totalCountsPerYear[year] = totalCountsPerYear[year] || { count: 0 };

      // Increment total count
      totalCountsPerYear[year].count += count;
    });

    const linearRegression = (x, y, predictX) => {
      // Calculate the mean of arrays x and y
      const meanX = x.reduce((acc, val) => acc + val, 0) / x.length;
      const meanY = y.reduce((acc, val) => acc + val, 0) / y.length;
    
      // Calculate the coefficients a and b of the linear regression equation (y = a * x + b)
      const numerator = x.reduce((acc, val, i) => acc + (val - meanX) * (y[i] - meanY), 0);
      const denominator = x.reduce((acc, val) => acc + Math.pow(val - meanX, 2), 0);
      const a = numerator / denominator;
      const b = meanY - a * meanX;
    
      // Predict the value for predictX
      const predictY = a * predictX + b;
    
      return predictY;
    };
    
    
    // Extract years and counts from the data
    const years = Object.keys(totalCountsPerYear).map(Number);
    const counts = Object.values(totalCountsPerYear).map((entry) => entry.count);
    
    // Predict the value for 2024
    const predictedValue = linearRegression(years, counts, 2024);

    res.json(predictedValue)
    
  } catch (error) {
    console.error(error)
    res.status(500).json({message: error.message})
  }
})
module.exports = router;
