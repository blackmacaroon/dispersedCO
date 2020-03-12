const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),

    data       = [
        {
            name: "rainbow lakes", 
            image:"https://source.unsplash.com/700x390/?forest,pond,lake", 
            cost: 0.00, 
            location: "right here", 
            description: "lots of sun, no privacy"
        },
        {
            name: "badger hollow", 
            image:"https://source.unsplash.com/700x390/?trees,thicket,field", 
            cost: 0.00, 
            location: "over there", 
            description: "lots of privacy, no sun"
        },
        {
            name: "menagerie coast", 
            image:"https://source.unsplash.com/700x390/?trees,coast,ocean", 
            cost: 0.00, 
            location: "north of fort collins", 
            description: "noisy and crowded"
        },
        {
            name: "slayers take", 
            image:"https://source.unsplash.com/700x390/?woods,camping,mountain", 
            cost: 0.00, 
            location: "down", 
            description: "damp and misty, very private"
        },
        {

            name: "nicodranas", 
            image:"https://source.unsplash.com/700x390/?mountain,woods,forest", 
            cost: 0.00, 
            location: "170 past idaho springs", 
            description: "beautiful and remote, lots of critters"
        },
        {
            name: "bill's canyon", 
            image:"https://source.unsplash.com/700x390/?canyon,desert", 
            cost: 0.00, 
            location: "up", 
            description: "very icy in the spring, bring lots of blankets"
        },
        {
            name: "salmon creek", 
            image:"https://source.unsplash.com/700x390/?stream,creek,brook", 
            cost: 0.00, 
            location: "second star to the left", 
            description: "beautiful but beware bears"}
    ]

function seedDB(){
    //Remove all camprounds    
    Campground.remove({}, function(err){
        if(err) {
            console.log(err)
        } else {
            console.log("campgrounds removed")
            //Wait til they're gone then add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("added a campground")
                        //Add a few comments
                        Comment.create(
                            {
                                text: "great views, no internet", 
                                author: "Ishmael"
                            }, function(err, comment){
                                if(err) {
                                    console.log(err)
                                } else {
                                    campground.comments.push(comment);
                                    campground.save()
                                    console.log("added new comment")
                                }
                        })
                    }
                })
            })
        }
    })
}

module.exports = seedDB;