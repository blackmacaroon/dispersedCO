const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    // Comment    = require("./models/comment"),

    data       = [
        {name: "rainbow lakes", image:"https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c722778d5934dc151_340.jpg", cost: 0.00, location: "right here", description: "lots of sun, no privacy"},
        {name: "badger hollow", image:"https://pixabay.com/get/57e0d2414250a414f6da8c7dda793f7f1636dfe2564c704c72277fd69f4cc459_340.jpg", cost: 0.00, location: "over there", description: "lots of privacy, no sun"},
        {name: "menagerie coast", image:"https://pixabay.com/get/57e2d6454f5aad14f6da8c7dda793f7f1636dfe2564c704c72277fd69f4dc05f_340.jpg", cost: 0.00, location: "north of fort collins", description: "noisy and crowded"},
        {name: "slayers take", image:"https://pixabay.com/get/55e2dc474c5aad14f6da8c7dda793f7f1636dfe2564c704c722778d29f4ecd5d_340.jpg", cost: 0.00, location: "down", description: "damp and misty, very private"},
        {name: "nicodranas", image:"https://pixabay.com/get/54e6d547435aad14f6da8c7dda793f7f1636dfe2564c704c72277fd69044c459_340.jpg", cost: 0.00, location: "170 past idaho springs", description: "beautiful and remote, lots of critters"},
        {name: "bill's canyon", image:"https://pixabay.com/get/57e3dc434b50b108f5d084609620367d1c3ed9e04e50744e7d2b79dc9644c2_340.jpg", cost: 0.00, location: "up", description: "very icy in the spring, bring lots of blankets"},
        {name: "salmon creek", image:"https://pixabay.com/get/57e2d1454853a514f6da8c7dda793f7f1636dfe2564c704c722778d0934fc55f_340.jpg", cost: 0.00, location: "second star to the left", description: "beautiful but beware bears"}
    ]

function seedDB(){
    //Remove all camprounds    
    Campground.remove({}, function(err){
        if(err) console.log(err)
        console.log("campgrounds removed")
        //Wait til they're gone then add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if(err) {
                    console.log(err)
                } else {
                    console.log("added a campground")
                    // Comment.create()
                }

            })
        })
    })
    
    
    //Add a few comments
}

module.exports = seedDB;