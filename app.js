const express       = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    // Comment         = require("./models/comment"),
    // User            = require("./models/user"),
    SeedDB          =require("./seeds")
    port            = 5555;



SeedDB();
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



// Campground.create({name: "badger hollow", image:"https://pixabay.com/get/57e0d2414250a414f6da8c7dda793f7f1636dfe2564c704c72277fd69f4cc459_340.jpg"}, function(err, campground){
//     if(err){
//         console.log(err)
//     } else {
//         console.log("camp created!")
//         console.log(campground)
//     }
// })

app.get("/", function(req, res){
    res.render("landing")
});

//get all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    })
});

// add new camp
app.post("/campgrounds", function(req, res){
    // get data from form input
    var name = req.body.name;
    var image = req.body.image;
    var cost = req.body.cost;
    var location = req.body.location;
    var description = req.body.description;
    var newCamp = {name: name, image: image, cost: cost, location: location, description: description}
    //create new campground and save to db
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            // redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    })
});

// get form for new camp
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new")
});

// get single camp by camp id
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id, function(err, foundCamp){
        if (err) console.log(err);
        //render show template with that camp
        res.render("campgrounds/show", {campground: foundCamp})
    })
})

app.listen(port, err => {
    if (err) console.log(err);
    console.log("camp server has started, hold on to your butts")
});