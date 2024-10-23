const express = require("express");

const router = express.Router();

const donorController = require("../Controllers/donors.Controller");

// get all donor info by area and group based
router
  .route("/public/donorInfo")
  .get(donorController.getBloodDonorByGroupAndArea);

// router.route("/createUser").post()
router
  .route("/")
  .post(donorController.createDonor)
  .patch(donorController.updateDonorProfile);

router
  .route("/:email")
  .get(donorController.donorInfo)
  .patch(donorController.changeRole);

// get all donors
router.route("/admin/users").get(donorController.getAllDonorInfo);

module.exports = router;
