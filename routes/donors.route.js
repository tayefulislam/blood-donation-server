const express = require("express");

const router = express.Router();

const donorController = require("../Controllers/donors.Controller");
router
  .route("/")
  .post(donorController.createDonor)
  .patch(donorController.updateDonorProfile);

router
  .route("/:email")
  .get(donorController.donorInfo)
  .patch(donorController.changeRole);

router.route("/admin/users").get(donorController.getAllDonorInfo);

module.exports = router;
