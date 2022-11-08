const express = require("express");

const router = express.Router();

const donorController = require("../Controllers/donors.Controller");

router.route("/createUser").post(donorController.createUser);
router.route("/login").get(donorController.loginUser);
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
