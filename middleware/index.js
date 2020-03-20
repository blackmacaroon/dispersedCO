const Comment = require("../models/comment")
const Campground = require("../models/campground")

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error", "You must be logged in to do that")
        res.redirect("/login")
    },

    checkUserCamp: function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    res.redirect("back")
                } else {
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that")
                        res.redirect("/campgrounds/" + req.params.id)
                    }
                }
            })
        } else {
            req.flash("error", "You must be logged in to do that")
            res.redirect("back")
        }
    },

    checkUserComment: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect("back")
                } else {
                    if(foundComment.author.id.equals(req.user._id)) {
                        next()
                    } else {
                        req.flash("error", "You don't have permission to do that")
                        res.redirect("/campgrounds/" + req.params.id)
                    }
                }
            })
        } else {
            req.flash("error", "You must be logged in to do that")
            res.redirect("back")
        }
    }
}