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
    areas,
    alert
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

    const newAdvisory = await Advisory.create({
      announcement,
      expirationDate,
      district,
      alert,
    });

    if (alert === "FIRE OUT") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: FIRE HAS BEEN NEUTRALIZED `,
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

    if (alert === "UNDER CONTROL") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: DECREASING FIRE RISK `,
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

    if (alert === "GENERAL ALARM") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: FIRE HAS AFFECTING MAJOR PART OF AREA `,
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
    if (alert === "TASK FORCE DELTA") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: FIRE HAS AFFECTING SIGNIFICANT PART OF AREA - 35 FIRE TRUCKS `,
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

    if (alert === "TASK FORCE CHARLIE") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: FIRE HAS AFFECTING SIGNIFICANT PART OF AREA - 32 FIRE TRUCKS`,
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

    if (alert === "TASK FORCE BRAVO") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE:  15 X 15 Houses AFFECTED - 28 Fire Trucks`,
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

    if (alert === "TASK FORCE ALPHA") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);
      console.log(phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: 12 X 12 Houses AFFECTED – 24 Fire Trucks`,
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

    if (alert === "FIFTH ALARM") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);
      console.log(phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: 10-11 Houses or High Rise Building AFFECTED - 20 Fire Trucks`,
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

    if (alert === "FOURTH ALARM") {
      // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
      const users = await User.findAll({
        where: {
          phone: { [Op.not]: null },
        },
      });
      const phone = users.map((user) => user.phone);
      console.log(phone);

      // Send SMS notifications to registered users
      phone.forEach((phone) => {
        client.messages
          .create({
            body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: 8-9 Houses or High Rise Building AFFECTED - 16 Fire Trucks `,
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

    if (areas) {
      for (const currentArea of areas) {

        if (alert === "THIRD ALARM") {
          // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
          const users = await User.findAll({
            where: {
              phone: { [Op.not]: null },
              district: district,
              area: currentArea
            },
          });
          const phone = users.map((user) => user.phone);
          console.log(phone);
  
          // Send SMS notifications to registered users
          phone.forEach((phone) => {
            client.messages
              .create({
                body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: 6-7 Houses or High Rise Building - 12 Fire Trucks `,
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
        if (alert === "SECOND ALARM") {
          const users = await User.findAll({
            where: {
              phone: { [Op.not]: null },
              district: district,
              area: currentArea
            },
          });
          const phone = users.map((user) => user.phone);
          console.log(phone);
  
          // Send SMS notifications to registered users
          phone.forEach((phone) => {
            client.messages
              .create({
                body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: 4-5 Houses - 8 Fire Trucks. `,
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
        if (alert === "FIRST ALARM") {
          // FIND USERS THAT REGISTERED IN THE SYSTEM EXCEPT ADMIN
          const users = await User.findAll({
            where: {
              phone: { [Op.not]: null },
              district: district,
              area: currentArea
            },
          });
          const phone = users.map((user) => user.phone);
          console.log(phone);
  
          // Send SMS notifications to registered users
          phone.forEach((phone) => {
            client.messages
              .create({
                body: `A new announcement has posted "${announcement}". PLEASE TAKE NOTE: 2-3 Houses - 4 Fire Trucks `,
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
      }
    }

    
    res.status(201).json({ advisory: newAdvisory });
  } catch (error) {
    console.error("Error creating advisory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
