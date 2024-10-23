const mongoose = require("mongoose");

const DonorQuerySchema = mongoose.Schema(
  {
    donorQueryByDistrictAndGroup: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    group: {
      type: String,
      trim: true,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const DonorQuery = mongoose.model("DonorQuery", DonorQuerySchema, "DonorQuery");
module.exports = DonorQuery;
