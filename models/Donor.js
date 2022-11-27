const mongoose = require("mongoose");

const DonorShema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },

    number: {
      type: String,
      trim: true,
      unique: true,
      index: true,
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
      enum: ["admin", "user"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donors", DonorShema, "donors");
module.exports = Donor;
