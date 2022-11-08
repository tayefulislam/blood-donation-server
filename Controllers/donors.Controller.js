const Donor = require("../models/Donor");
const bcrypt = require("bcryptjs");
const {
  createDonorService,
  updateDonorProfileService,
  donorInfoService,
  getAllDonorInfoService,
  changeRoleService,
  createUserService,
  loginUserService,
} = require("../Services/donors.Services");
const { genateToken } = require("../utils/token");

exports.createDonor = async (req, res, next) => {
  try {
    const newDonor = req.body;

    const result = await createDonorService(newDonor);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

exports.updateDonorProfile = async (req, res, next) => {
  try {
    const donor = req.body;

    console.log(donor);
    const filter = { email: donor.email };

    const result = await updateDonorProfileService(filter, donor);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

exports.donorInfo = async (req, res, next) => {
  try {
    const email = req.params.email;

    const result = await donorInfoService(email);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

/// Admin Action

exports.getAllDonorInfo = async (req, res, next) => {
  try {
    const { email } = req.query;

    const result = await getAllDonorInfoService(email);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "User Data Not Found",
      error: error.message,
    });
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const email = req.params.email;
    console.log(email);
    const result = await changeRoleService(email);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  // const user = req.body;
  console.log(req.body);

  try {
    const user = await createUserService(req.body);
    console.log(user);
    res.status(200).json({
      status: "success",
      message: "User Created",
      result: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "User Created failed",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email and password availbe
    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        error: "Plase give email password",
      });
    }

    const user = await loginUserService(email);
    console.log(user);
    // check user is exits or not
    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "User not found",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    // const isValidPassword = bcrypt.compareSync(password, user.password);

    console.log(isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        status: "failed",
        error: "password is not correct",
      });
    }

    const token = genateToken(user);

    const { password: dataPassoword, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Login Succeful",
      data: { user: others, token },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to Login ,Plase try again",
      error: error.message,
    });
  }
};
