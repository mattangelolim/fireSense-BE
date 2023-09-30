const Advisory = require("../models/Advisory");
const { Op, User } = require("../models/Users");
const router = require("express").Router();
const accountSid = "ACca39c5090e29044ba0e50afca61bc769";
const authToken = "5acaade223b7348bc0cdda008d0c61ae";
const client = require("twilio")(accountSid, authToken);

// Route to create a new advisory
router.post("/advisory", async (req, res) => {
  const { announcement, expirationDate, district } = req.body;

  try {
    const newAdvisory = await Advisory.create({
      announcement,
      expirationDate,
      district,
    });

    // Assuming each user has a registered phone number in the database
    const users = await User.findAll({
      where: {
        phone: { [Op.not]: null },
        user_type: { [Op.not]: "admin" },
      },
    });
    const phone = users.map((user) => user.phone);
    console.log(phone);

    // Send SMS notifications to registered users
    phone.forEach((phone) => {
      client.messages
        .create({
          body: `There's a new advisory posted in firesense website!!`,
          from: "+17855092002",
          to: phone,
        })
        .then((message) => console.log(`SMS sent to ${phone}: ${message.sid}`))
        .catch((error) =>
          console.error(`Error sending SMS to ${phone}:`, error)
        );
    });
    res.status(201).json({ advisory: newAdvisory, phone: phone });
  } catch (error) {
    console.error("Error creating advisory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
