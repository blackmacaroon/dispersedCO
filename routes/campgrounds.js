const express = require("express")
const router = express.Router()
const Campground = require("../models/campground")
const Comment = require("../models/comment")
const middleware = require("../middleware")
const { isLoggedIn, checkUserCampground, checkUserComment, isAdmin, isSafe } = middleware

// define escpe regex function for search feature

// show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            if(req.xhr){
                res.json(allCampgrounds)
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'})
            }
        }
    })
});

// add new campground to database
router.post("/", function(req, res){
    // let name = req.body.name
    // let image = req.body.image
    // let desc = req.body.desc
    // let author = {
    //     id: req.user._id,
    //     username: req.user.username
    // }
    // let cost = req.body.cost
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            console.log(newlyCreated)
            res.redirect("/campgrounds")
        }
    })
});

// app.post("/campgrounds", function(req, res){
//     // get data from form input
//     var name = req.body.name;
//     var image = req.body.image;
//     var cost = req.body.cost;
//     var location = req.body.location;
//     var description = req.body.description;
//     var newCamp = {name: name, image: image, cost: cost, location: location, description: description}
//     //create new campground and save to db
//     Campground.create(newCamp, function(err, newlyCreated){
//         if(err){
//             console.log(err)
//         } else {
//             // redirect to campgrounds page
//             res.redirect("/campgrounds");
//         }
//     })
// });

// show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});

// show info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            console.log(err)
            return res.redirect('/campgrounds')
        }
        console.log(foundCampground)
        res.render("campgrounds/show", {campground: foundCampground})
    })
});

//edit
//delete

module.exports = router