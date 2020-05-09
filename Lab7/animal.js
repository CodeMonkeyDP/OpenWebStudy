const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    species: String,
    width: Number,
    height: Number,
    ID: String,
    image: String,
    value: Number
});

const animal = mongoose.model("animal",animalSchema);

module.exports = animal;