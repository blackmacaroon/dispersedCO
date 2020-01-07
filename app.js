const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5555;

const campgrounds = [
    {name: "rainbow lakes", image:"https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c722778d5934dc151_340.jpg"},
    {name: "badger hollow", image:"https://pixabay.com/get/57e0d2414250a414f6da8c7dda793f7f1636dfe2564c704c72277fd69f4cc459_340.jpg"},
    {name: "menagerie coast", image:"https://pixabay.com/get/57e2d6454f5aad14f6da8c7dda793f7f1636dfe2564c704c72277fd69f4dc05f_340.jpg"},
    {name: "slayers take", image:"https://pixabay.com/get/55e2dc474c5aad14f6da8c7dda793f7f1636dfe2564c704c722778d29f4ecd5d_340.jpg"},
    {name: "nicodranas", image:"https://pixabay.com/get/54e6d547435aad14f6da8c7dda793f7f1636dfe2564c704c72277fd69044c459_340.jpg"},
    {name: "bill's canyon", image:"https://pixabay.com/get/57e3dc434b50b108f5d084609620367d1c3ed9e04e50744e7d2b79dc9644c2_340.jpg"},
    {name: "salmon creek", image:"https://pixabay.com/get/57e2d1454853a514f6da8c7dda793f7f1636dfe2564c704c722778d0934fc55f_340.jpg"}
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    // add to campgrounds array
    var newCamp = {name: name, image: image}
    campgrounds.push(newCamp)
    // redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
});

app.listen(port, err => {
    if (err) console.log(err);
    console.log("camp server has started, hold on to your butts")
});