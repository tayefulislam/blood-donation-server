const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const bloodRequestsRoute = require("./routes/bloodRequests.route");
const donorsRoute = require("./routes/donors.route");

app.get("/", (req, res) => {
  res.send("App Working");
});

app.use("/api/v1/bloodRequest", bloodRequestsRoute);
app.use("/api/v1/donors", donorsRoute);

module.exports = app;
