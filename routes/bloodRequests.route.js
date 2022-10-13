const express = require("express");
const router = express.Router();

const bloodRequestsController = require("../Controllers/bloodRequests.Controller");

router.route("/").post(bloodRequestsController.makeBloodRequests);

module.exports = router;
