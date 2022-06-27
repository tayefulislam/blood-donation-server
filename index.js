const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

// middle ware

app.use(cors())
app.use(express.json())


// connect to database 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.69der.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



async function run() {

    try {

        await client.connect()

        const requestCollection = client.db("bloodDonation1").collection("bloodRequests");
        const donorCollection = client.db("bloodDonation1").collection("donors");

        // blood request
        app.post('/bloodRequest', async (req, res) => {
            const newRequest = req.body;
            const result = await requestCollection.insertOne(newRequest);
            res.send(result)
        })

        // create new Donor 

        app.post('/createDonor', async (req, res) => {
            const donor = req.body;
            // console.log(donor)
            const result = await donorCollection.insertOne(donor)
            res.send(result)
        })


        // update profile 


        app.post('/updateProfile', async (req, res) => {

            const donor = req.body;

            console.log(donor)
            const filter = { email: donor.email }

            const updatedProfile = {
                $set: donor
            }

            const result = await donorCollection.updateOne(filter, updatedProfile)

            console.log()

            res.send(result)


        })


        // get singel donor info


        app.get('/profile/:email', async (req, res) => {

            const email = req.params.email;

            const result = await donorCollection.findOne({ email: email })

            console.log(email)

            res.send(result)

        })


        // get match blood request 

        app.get('/bloodreqests', async (req, res) => {

            console.log(req.query)
            // const group = req.params.group
            const { group, district } = req?.query;

            console.log(group, district)


            const query = { group: group, district: district };

            const result = await requestCollection.find(query).sort({ _id: -1 }).toArray()

            console.log(result)

            res.send(result)



        })


        // all request

        app.get('/allbloodrequests', async (req, res) => {

            const result = requestCollection.find().sort({ _id: -1 }).toArray()

            res.send(result)

        })




















    }

    finally {

    }

}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Server is runtting ar port')
})

app.listen(port, () => {
    console.log('server is running ar port', port)
})

