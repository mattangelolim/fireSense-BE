require("dotenv").config();
const express = require("express");

const userRegistrationRoute = require("./routes/userRegisterRoutes");

// const User = require("./models/Users");
const port = process.env.PORT;

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/user", userRegistrationRoute);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
