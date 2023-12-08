const Advisory = require("../models/Advisory");
const { Op, User } = require("../models/Users");
const router = require("express").Router();
const accountSid = "AC5e673e372afd9c9374b6e5c4ff0ac3f6";
const authToken = "ad99134cc1fe5b761e3c709519a36ba9";
const client = require("twilio")(accountSid, authToken);
const moment = require("moment-timezone");

// Route to create a new advisory
router.post("/advisory", async (req, res) => {
  const {
    announcement,
    expirationHours,
    expirationMinutes,
    expirationSeconds,
    district,
    alert,
  } = req.body;

  try {
    const CurrentDate = moment()
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");

    const expirationDate = moment(CurrentDate)
      .add(expirationHours, "hours")
      .add(expirationMinutes, "minutes")
      .add(expirationSeconds, "seconds")
      .format("YYYY-MM-DD HH:mm:ss");

    console.log(expirationDate);

    const newAdvisory = await Advisory.create({
      announcement,
      expirationDate,
      district,
      alert,
    });

    if (alert === "Alert 3") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
          // district: district,
          // user_type: { [Op.not]: "admin" },
        },
      });
      const phone = users.map((user) => user.phone);
      console.log(phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}" `,
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
    if (alert === "Alert 2") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
          district: district,
          // user_type: { [Op.not]: "admin" },
        },
      });
      const phone = users.map((user) => user.phone);
      console.log(phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}" `,
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
    if (alert === "Alert 1") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
          district: district,
          user_type: {
            [Op.or]: ["Firefighter", "Resident"],
          },
        },
      });
      const phone = users.map((user) => user.phone);
      console.log(phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}" `,
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
    res.status(201).json({ advisory: newAdvisory});
  } catch (error) {
    console.error("Error creating advisory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
