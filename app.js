const express       = require("express"),
    app             = express(),
    LocalStrategy   = require("passport-local"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    SeedDB          = require("./seeds")
    port            = 5555;




mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
SeedDB();

// passport config
app.use(require("express-session")({
    secret: "wasn't me",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
    //find campground with provided id, populating the comments on the campground, execute query
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if (err) {
            console.log(err);
        } else {
            //render show template with that camp
            res.render("campgrounds/show", {campground: campground})
        }
    })
})

// get comments
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
})
app.post("/campgrounds/:id/comments/", function(req, res){
    //look up camp with id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err)
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment)
                    campground.save()
                    //redirect campground show page
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

// AUTH ROUTES

app.get("/register", function(req, res){
    res.render("register")
})
app.post("/register", function(req, res){
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds")
            })
        }
    })
})


app.listen(port, err => {
    if (err) console.log(err);
    console.log("camp server has started, hold on to your butts")
});