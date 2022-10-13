const express = require("express");

const router = express.Router();

const donorController = require("../Controllers/donors.Controller");
router
  .route("/")
  .post(donorController.createDonor)
  .patch(donorController.updateDonorProfile);

module.exports = router;
