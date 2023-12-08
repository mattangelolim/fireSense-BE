const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

const accountSid = "AC5e673e372afd9c9374b6e5c4ff0ac3f6";
const authToken = "ad99134cc1fe5b761e3c709519a36ba9";
const client = require("twilio")(accountSid, authToken);
const { User } = require("../models/Users")

router.post("/message", async (req, res) => {
    const year = req.query.year;
    const district = req.query.district;
    const values = req.query.values

    const announcement = "We are issuing an Orange Warning due to an alarming increase in fire cases in our district. Please exercise extreme caution and adhere to fire safety protocols. Avoid any activities that may pose a fire risk, and report any suspicious behavior promptly."
    const announcement2 = "Red Alarm: URGENT ACTION REQUIRED! A Red Alert has been issued due to a critical surge in fire incidents. Immediate action is necessary to ensure the safety of you and your community. Follow evacuation procedures, stay tuned to emergency channels, and assist neighbors who may need help."
    try {
        if (year >= 2023) {
            if (values >= 15) {
                const users = await User.findAll({
                    where: {
                        district: district,
                        phone: { [Op.not]: null },
                    },
                });
                const phoneNumbers = users.map((user) => user.phone);
                console.log(phoneNumbers);

                // Send SMS notifications to registered users
                phoneNumbers.forEach((phone) => {
                    client.messages
                        .create({
                            body: `From BFP to residents of ${district}, "${announcement}"`,
                            from: "+12295261907",
                            to: phone,
                        })
                        .then((message) =>
                            console.log(`SMS sent to ${phone}: ${message.sid}`)
                        )
                        .catch((error) =>
                            console.error(`Error sending SMS to ${phone}:`, error)
                        );
                });
            }else if (values >= 30) {
                const users = await User.findAll({
                    where: {
                        district: district,
                        phone: { [Op.not]: null },
                    },
                });
                const phoneNumbers = users.map((user) => user.phone);
                console.log(phoneNumbers);

                // Send SMS notifications to registered users
                phoneNumbers.forEach((phone) => {
                    client.messages
                        .create({
                            body: `"${announcement2}"`,
                            from: "+12295261907",
                            to: phone,
                        })
                        .then((message) =>
                            console.log(`SMS sent to ${phone}: ${message.sid}`)
                        )
                        .catch((error) =>
                            console.error(`Error sending SMS to ${phone}:`, error)
                        );
                });
            }
            else {
                return res.status(404).json({ message: "Cases are low" })
            }
        } else {
            return res.status(400).json({ message: "It is not year 2023 above" })
        }
        res.status(200).send("Messages sent successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
