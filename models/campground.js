const mongoose = require("mongoose");
const Comment = require('./comment');

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    cost: Number,
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

// campgroundSchema.pre('remove', async function(next) {
//     try {
//         await Comment.remove({
//             "_id": {
//                 $in: this.comments
//             }
//         })
//         next()
//     } catch(err) {
//         next(err)
//     }
// })


module.exports = mongoose.model("Campground", campgroundSchema);