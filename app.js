const express       = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    port            = 5555;

// const campgrounds = [
//     {name: "rainbow lakes", image:"https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c722778d5934dc151_340.jpg"},
//     {name: "badger hollow", image:"https://pixabay.com/get/57e0d2414250a414f6da8c7dda793f7f1636dfe2564c704c72277fd69f4cc459_340.jpg"},
//     {name: "menagerie coast", image:"https://pixabay.com/get/57e2d6454f5aad14f6da8c7dda793f7f1636dfe2564c704c72277fd69f4dc05f_340.jpg"},
//     {name: "slayers take", image:"https://pixabay.com/get/55e2dc474c5aad14f6da8c7dda793f7f1636dfe2564c704c722778d29f4ecd5d_340.jpg"},
//     {name: "nicodranas", image:"https://pixabay.com/get/54e6d547435aad14f6da8c7dda793f7f1636dfe2564c704c72277fd69044c459_340.jpg"},
//     {name: "bill's canyon", image:"https://pixabay.com/get/57e3dc434b50b108f5d084609620367d1c3ed9e04e50744e7d2b79dc9644c2_340.jpg"},
//     {name: "salmon creek", image:"https://pixabay.com/get/57e2d1454853a514f6da8c7dda793f7f1636dfe2564c704c722778d0934fc55f_340.jpg"}
// ]

mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

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
    var description = req.body.description;
    var newCamp = {name: name, image: image, description: description}
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