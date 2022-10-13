const mongoose = require("mongoose");

const DonorShema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please Enter Patient Name"],
    },

    number: {
      type: String,
      trim: true,
      required: [true, "Please Enter Phone Number"],
    },
    group: {
      type: String,
      trim: true,
      required: [true, "Please Select Blood Group"],
    },

    district: {
      type: String,
      trim: true,
      required: [true, "Please select your district Name"],
    },
    area: {
      type: String,
      trim: true,
      required: [true, "Please write down your address"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please write down your address"],
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donors", DonorShema, "donors");
module.exports = Donor;
