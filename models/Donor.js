const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const validator = require("validator");
const DonorShema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
    },
    name: {
      type: String,
      trim: true,
      require: true,
    },

    number: {
      type: String,
      trim: true,
    },
    group: {
      type: String,
      trim: true,
    },

    district: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
    },

    password: {
      type: String,
      minLength: 6,
    },
  },
  { timestamps: true }
);

DonorShema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  console.log(password);
  this.password = hashedPassword;
  next();
});

const Donor = mongoose.model("Donors", DonorShema, "donors");
module.exports = Donor;
