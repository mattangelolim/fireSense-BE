require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRegistrationRoute = require("./routes/userRegisterRoutes");
const userActivationRoute = require("./routes/userActivationRoutes");
const userLoginRoute = require("./routes/userLoginRoutes");
const casesRoute = require("./routes/casesRoutes");
const commentRoute = require("./routes/commentRoutes");
const liveRoute = require("./routes/liveRegistrationRoutes");
const liveUpdate = require("./routes/liveUpdateRoutes");

const adminAdvisoryRoute = require("./routes/adminAdvisoryRoutes");
const getAnnouncementRoute = require("./routes/getRouters/getAnnouncements");
const getLiveRoute = require("./routes/getRouters/getLives");
const getComments = require("./routes/getComments");
const deleteLive = require("./routes/deleteLive");
const deleteAdvisory = require("./routes/advisoryDeleteRoutes");
const movingAverage = require("./routes/movingAverageRoutes")
const adminAddCases = require("./routes/adminAddCaseRoute")
const adminReport = require("./routes/adminReportCase")
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
app.use("/api", getLiveRoute);
app.use("/api", deleteLive);
app.use("/api", commentRoute);
app.use("/api", liveRoute);

app.use("/api", liveUpdate);

app.use("/api", getComments);
app.use("/api", deleteAdvisory);
app.use("/api", movingAverage);

app.use("/all", casesRoute);
app.use("/api", adminAddCases);
app.use("/api", adminReport)

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
