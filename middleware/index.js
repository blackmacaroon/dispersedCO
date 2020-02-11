const Comment = require("../models/comment")
const Campground = require("../models/campground")
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/login')
    },
    checkUserCamp: function(req, res, next){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                console.log(err)
                res.redirect('/campground')
            } else if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                req.campground = foundCampground
                next();
            } else {
                res.redirect('/campgrounds/' + req.params.id)
            }
        })
    },
    checkUserComment: function(req, res, next){
        Comment.findById(req.params.commentId, function(err, foundComment){
            if(err || !foundComment){
                console.log(err)
                res.redirect('/campground')
            } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                req.comment = foundComment
                next()
            } else {
                res.redirect('/campgrounds/' + req.params.id)
            }
        })
    },
    isAdmin: function(req, res, next){
        if(req.user.isAdmin) {
            next()
        } else {
            res.redirect('back')
        }
    }
    
}