const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middle ware

app.use(cors());
app.use(express.json());

// connect to database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.69der.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.Email_Host,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.Email_Address, // generated ethereal user
    pass: process.env.Email_Password, // generated ethereal password
  },
});

// email system

async function run() {
  try {
    await client.connect();

    const requestCollection = client
      .db("bloodDonation1")
      .collection("bloodRequests");
    const donorCollection = client.db("bloodDonation1").collection("donors");

    // send emails

    async function bloodRequestEmail(donorsEmail, newRequest) {
      console.log(donorsEmail, newRequest);

      const { group } = newRequest;

      let newBloodRequestEmail = await transporter.sendMail({
        from: '"Blood Donation App 👻" <tayeful912@gmail.com>', // sender address
        bcc: donorsEmail, // list of receivers
        subject: `Request for ${group} Blood`, // Subject line
        text: `Request for ${group} Blood`, // plain text body
        html: `<b>Request for ${group} Blood</b>`, // html body
      });

      return "Message sent: %s", newBloodRequestEmail.messageId;
    }

    // blood request
    app.post("/bloodRequest", async (req, res) => {
      const newRequest = req.body;

      // console.log(newRequest)

      // user user avaible check
      const { group, district } = newRequest;
      const query = { group: group, district: district };
      const availableDonor = await donorCollection
        .find(query, { email: 1 })
        .sort({ _id: -1 })
        .toArray();

      let donorsEmail = [];

      availableDonor.map((donor) => donorsEmail.push(donor.email));

      //  console.log(donorsEmail)

      const result = await requestCollection.insertOne(newRequest);
      res.send(result);

      bloodRequestEmail(donorsEmail, newRequest);

      // console.log(availableDonor)
    });

    // create new Donor

    app.post("/createDonor", async (req, res) => {
      const donor = req.body;
      // console.log(donor)
      const result = await donorCollection.insertOne(donor);
      res.send(result);
    });

    // update profile

    app.post("/updateProfile", async (req, res) => {
      const donor = req.body;

      console.log(donor);
      const filter = { email: donor.email };

      const updatedProfile = {
        $set: donor,
      };

      const result = await donorCollection.updateOne(filter, updatedProfile);

      console.log();

      res.send(result);
    });

    // get singel donor info

    app.get("/profile/:email", async (req, res) => {
      const email = req.params.email;

      const result = await donorCollection.findOne({ email: email });

      console.log(email);

      res.send(result);
    });

    // get match blood request

    app.get("/bloodreqests", async (req, res) => {
      console.log(req.query);
      // const group = req.params.group
      const { group, district } = req.query;

      console.log(group, district);

      const query = { group: group, district: district };

      const result = await requestCollection
        .find(query)
        .sort({ _id: -1 })
        .toArray();

      console.log(result);

      res.send(result);
    });

    // all request

    app.get("/allbloodrequests", async (req, res) => {
      const result = await requestCollection.find().sort({ _id: -1 }).toArray();

      res.send(result);
    });

    // singel request

    app.get(`/requestDetails/:reqId`, async (req, res) => {
      const reqId = req.params.reqId;
      console.log(reqId);

      const result = await requestCollection.findOne({ _id: ObjectId(reqId) });

      console.log(result);
      res.send(result);
    });

    /*
        
        // Admin section 
        
        */

    app.post("/makeadmin", async (req, res) => {
      console.log(req.body);
    });

    // get All User

    app.get(`/admin/users`, async (req, res) => {
      const result = await donorCollection.find().toArray();

      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is runtting ar port");
});

app.listen(port, () => {
  console.log("server is running ar port", port);
});
