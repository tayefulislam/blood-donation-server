const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.Email_Host,
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.Email_Address,
    pass: process.env.Email_Password,
  },
});

async function sendMail(newRequest) {
  // console.log(newRequest);
  console.log("Again");
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Rokto Khujun" ${process.env.Email_Address}`, // sender address
    to: `${process.env.Admin_Emails}`, // list of receivers
    subject: `${newRequest?.group} ( ${newRequest?.district} )  New Blood Request`, // Subject line
    text: `New Blood Request of ${newRequest?.group} - ${newRequest?.district}`, // plain text body
    html: `
    
    
    <b>New Blood Request of ${newRequest?.group} - ${newRequest?.district}</b> <br/>

    <h3>Details<h3/> <br/>

    <p>
    
    Name : ${newRequest?.patient} <br/>
    Blood Group : ${newRequest?.group} <br/>
    District : ${newRequest?.district}<br/>
    Area : ${newRequest?.area}<br/>
    date: ${newRequest?.date}<br/>
    Contact Number : ${newRequest?.number}<br/>
    Medical Name : ${newRequest?.medical}<br/>
    Bag (Unit) : ${newRequest?.unit}<br/>
    Comment : ${newRequest?.comment}
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

const bloodRequests = require("../models/bloodRequests");

exports.makeBloodRequestsService = async (newRequest) => {
  // console.log("Request Come");
  sendMail(newRequest).catch(console.error);

  const result = await bloodRequests.create(newRequest);

  return result;
};

exports.getBloodRequestsSerive = async (queries) => {
  console.log(queries);
  const result = await bloodRequests.find(queries).sort({ _id: -1 });
  console.log(result);
  return result;
};

exports.getBloodRequestByIdSerive = async (id) => {
  const result = await bloodRequests.find({ _id: id });
  console.log(result[0]);
  return result[0];
};
