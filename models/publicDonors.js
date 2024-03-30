const mongoose = require("mongoose");

const PublicDonorsSchema = mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
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
    lastDonation: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    gender: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PublicDonors = mongoose.model(
  "PublicDonors",
  PublicDonorsSchema,
  "PublicDonors"
);

module.exports = PublicDonors;
