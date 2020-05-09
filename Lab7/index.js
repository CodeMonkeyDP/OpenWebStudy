const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost/animal-db", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Connection to BD Success!")
});

app.use('/pic', express.static('pic'));
app.use(bodyParser.json());
app.use("/api",require("./api"));

app.listen(8888, ()=>{
    console.log("Server processing...");
});

