require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRegistrationRoute = require("./routes/userRegisterRoutes");
const userActivationRoute = require("./routes/userActivationRoutes");
const userLoginRoute = require("./routes/userLoginRoutes");
const casesRoute = require("./routes/casesRoutes");

const adminAdvisoryRoute = require("./routes/adminAdvisoryRoutes");
const getAnnouncementRoute = require("./routes/getRouters/getAnnouncements");

// const User = require("./models/Users");
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/user", userRegistrationRoute);
app.use("/user", userActivationRoute);
app.use("/user", userLoginRoute);
app.use("/admin", adminAdvisoryRoute);
app.use("/api", getAnnouncementRoute);

app.use("/all", casesRoute);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
