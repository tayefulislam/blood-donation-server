const express = require("express");

const router = express.Router();

const donorController = require("../Controllers/donors.Controller");
const { verifyToken } = require("../middlewares/verifyToken");

const authorization = require("../middlewares/authorization");

router.route("/createUser").post(donorController.createUser);
router.route("/login").get(donorController.loginUser);

router.route("/getMe").get(verifyToken, donorController.getMe);

router
  .route("/")
  .post(donorController.createDonor)
  .patch(donorController.updateDonorProfile);

router
  .route("/:email")
  .get(donorController.donorInfo)
  .patch(donorController.changeRole);

router
  .route("/admin/users")
  .get(authorization("admin"), donorController.getAllDonorInfo);

module.exports = router;
