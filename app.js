const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const bloodRequestsRoute = require("./routes/bloodRequests.route");
const donorsRoute = require("./routes/donors.route");
const publicDonorsRoute = require("./routes/publicDonors.route");
const DonorQueryRoute = require("./routes/donorQuery.route");

app.get("/", (req, res) => {
  res.send("Blue Space Api Public API Services");
});

app.use("/api/v1/bloodRequest", bloodRequestsRoute);
app.use("/api/v1/donors", donorsRoute);
app.use("/api/v2/publicDonors", publicDonorsRoute);
app.use("/api/v1/DonorQueryTotalHit", DonorQueryRoute);

// app.use("/api/v2/public", donorsRoute);

module.exports = app;
