const mongoose = require("mongoose");
const Comment = require('./comment');

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    cost: String,
    location: String,
    description: String,
    lat: Number,
    long: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);