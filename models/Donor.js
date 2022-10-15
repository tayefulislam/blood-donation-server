const mongoose = require("mongoose");

const DonorShema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donors", DonorShema, "donors");
module.exports = Donor;
