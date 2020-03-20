const express = require("express")
const router = express.Router()
const Campground = require("../models/campground")
const middleware = require("../middleware")
const { isLoggedIn, checkUserCamp } = middleware

// define escpe regex function for search feature

// show all campgrounds
router.get("/", function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, allCampgrounds){
            if(err){
                console.log(err)
            } else {
                if(allCampgrounds.length < 1){
                    req.flash("error", "Nothing found, please try again")
                    return res.redirect("/campgrounds")
                }
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds'})
            }
        })
    } else {
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err)
            } else {
                if(req.xhr){
                    res.json(allCampgrounds)
                } else {
                    res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds'})
                }
            }
        })
    }
});

// add new campground to database
router.post("/", isLoggedIn, function(req, res){
    let name = req.body.name
    let image = req.body.image
    let location = req.body.location
    let description = req.body.description
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let cost = req.body.cost
    let newCampground = {name:name, image:image, cost:cost, location:location, description:description, author:author}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds")
        }
    })
});

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

//edit - campground form
router.get("/:id/edit", checkUserCamp, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            req.flash("error", "Oops, nope.")
            res.redirect("/campgrounds")
        } else {
        res.render("campgrounds/edit", {campground: foundCampground})
        }
    })
});
//handle campground update
router.put("/:id", checkUserCamp, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Something went wrong on our end")
            res.redirect("back")
        } else {
            req.flash("success", "Updated camp site data")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});
//destroy
router.delete("/:id", checkUserCamp, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Camp deleted")
            res.redirect("/campgrounds")
        }
    })
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router