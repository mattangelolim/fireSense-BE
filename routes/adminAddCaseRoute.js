const express = require("express");
const router = express.Router();
const Case = require("../models/Case");

router.post("/report/case", async (req, res) => {
    try {
        const { year, month, district, area, count } = req.body;

        // Check if a case with the specified year, district, and area
        const existingCase = await Case.findOne({
            where: {
                year: year,
                month: month,
                district: district,
                area: area
            }
        });

        console.log(existingCase)


        if (existingCase) {
            // If the case exists, update the count
            existingCase.count += count;
            await existingCase.save();
            res.json({ message: "Case count updated successfully", case: existingCase });
        } else {
            // If the case doesn't exist
            const newCase = new Case({
                year,
                month,
                district,
                area,
                count,
            });

            await newCase.save();
            res.json({ message: "Case reported successfully", case: newCase });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
