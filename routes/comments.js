const express = require("express")
const router = express.Router({mergeParams: true}) // otherwise can't find campground ids
const Campground = require("../models/campground")
const Comment = require("../models/comment")
const middleware = require("../middleware")
const { isLoggedIn, checkUserComment } = middleware

// comments new
router.get("/new", isLoggedIn, function(req, res){
    console.log(req.params.id)
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Camp data not found")
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
})

// comments create
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
             req.flash("error", "Camp data not found")
             res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Could not post comment to camp data")
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
})

//comment edit route
router.get("/:comment_id/edit", checkUserComment, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
        }
    })
})

//comment update
router.put("/:comment_id", checkUserComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})
//delete comment
router.delete("/:comment_id", checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

module.exports = router