const mongoose = require("mongoose");

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    cost: Number,
    location: String,
    description: String
});


module.exports = mongoose.model("Campground", campgroundSchema);