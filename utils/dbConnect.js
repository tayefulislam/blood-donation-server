const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

function dbConnect() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.69der.mongodb.net/?retryWrites=true&w=majority`;
    // console.log(uri)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    console.log(client)

    return client;
}

module.exports = dbConnect;