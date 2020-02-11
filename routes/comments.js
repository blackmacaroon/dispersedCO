const express = require("express")
const router = express.Router({mergeParams: true})
const Campground = require("../models/campground")
const Comment = require("../models/comment")
const middleware = require("../middleware")
const { isLoggedIn, checkUserComment, isAdmin } = middleware

// comments new
router.get("/new", isLoggedIn, function(req, res){
    console.log(req.params.id)
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
});

// comments create
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
             console.log(err)
             res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    console.log(comment)
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
});

//edit
//delete

module.exports = router