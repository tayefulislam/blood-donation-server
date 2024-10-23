const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;
const uri = process.env.URI;
console.log(uri);

mongoose.connect(uri).then(() => {
  console.log(uri + "database");
});

app.listen(port, () => {
  console.log("server is run ar port", port);
});
