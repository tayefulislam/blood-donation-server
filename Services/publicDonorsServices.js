const nodemailer = require("nodemailer");
const PublicDonors = require("../models/publicDonors");
const DonorQuery = require("../models/donorQuery");

// Email Sender
const transporter = nodemailer.createTransport({
  host: process.env.Email_Host,
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.Email_Address,
    pass: process.env.Email_Password,
  },
});

async function sendMail(newPublicDonors) {
  // console.log(newPublicDonors);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Rokto Khujun" ${process.env.Email_Address}`, // sender address
    to: `${process.env.Admin_Emails}`, // list of receivers
    subject: `New Donor -  ${newPublicDonors?.name} - ${newPublicDonors?.group} (${newPublicDonors?.district})`, // Subject line
    text: `New Donor -  ${newPublicDonors?.name} - ${newPublicDonors?.group} (${newPublicDonors?.district})`, // plain text body
    html: `
    
    
    <b>New Blood Donor Register ${newPublicDonors?.group} (${newPublicDonors?.district})</b> <br/>

    <p>
    <h4>Details<h4/> <br/>
    Name        : ${newPublicDonors?.name} <br/>
    Blood Group : ${newPublicDonors?.group} <br/>
    Gender      : ${newPublicDonors?.gender} <br/>
    District    : ${newPublicDonors?.district}<br/>
    Area        : ${newPublicDonors?.area}<br/>
    date        : ${newPublicDonors?.lastDonation}<br/>
    Number      : ${newPublicDonors?.number}<br/>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

exports.createPublicDonorsServices = async (newPublicDonors) => {
  // console.log(newPublicDonors);
  // console.log(newPublicDonors);
  sendMail(newPublicDonors);
  const result = PublicDonors.create(newPublicDonors);
  return result;
};

exports.getAllPublicDonorsServices = async (queries) => {
  // get all donors
  const result = await PublicDonors.find(queries);
  // create query
  const query = {
    donorQueryByDistrictAndGroup: `${queries.group} = ${queries.district}`,
  };
  // check Ability
  const checkAbility = await DonorQuery.find(query);

  if (checkAbility[0]) {
    // increase count by one
    const update = { count: checkAbility[0].count + 1 };

    await DonorQuery.findOneAndUpdate(query, update);
    // console.log("Find one ", checkAbility[0].donorQueryByDistrictAndGroup);
  } else {
    // if not available create new

    const newQuery = {
      donorQueryByDistrictAndGroup: `${queries.group} = ${queries.district}`,
      district: queries.district,
      group: queries.group,
    };

    await DonorQuery.create(newQuery);
  }

  // save or update
  // const doc = await DonorQuery.findOneAndUpdate(filter, filter, {
  //   new: true,
  //   upsert: true, // Make this update into an upsert
  // });

  // console.log(doc);

  // const saveDonorQuery = DonorQuery.create(donorQueryByDistrictAndGroup);

  // How to Get Oldest data Depend No date....

  function sortByLastDonation(a, b) {
    const dateA = new Date(a.lastDonation);
    const dateB = new Date(b.lastDonation);
    return dateA - dateB;
  }

  // Sort the donors array using the sortByLastDonation function
  const rankedDonors = result.sort(sortByLastDonation);

  // Print the ranked donors (oldest to newest)
  // console.log(rankedDonors);

  return rankedDonors;
};

// updated public donor Area or Last donation date

exports.updateAreaOrLastDonationDateServices = async (donor) => {
  // Update District
  console.log(donor);
  if (donor.district) {
    const result = await PublicDonors.updateOne(
      { number: donor.number },
      { district: donor.district, area: donor.area }
    );

    return result;
  }
  // update last Donation Date
  else if (donor.lastDonation) {
    const result = await PublicDonors.updateOne(
      { number: donor.number },
      { lastDonation: donor.lastDonation }
    );

    return result;
  }
};
