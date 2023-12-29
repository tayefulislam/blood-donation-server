const express = require("express");

const router = express.Router();

const publicDonorController = require("../Controllers/publicDonors.Controller");

router
  .route("/")
  .get(publicDonorController.getAllPublicDonors)
  .post(publicDonorController.createPublicDonors);

module.exports = router;
