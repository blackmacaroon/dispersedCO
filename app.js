const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5555;

const campgrounds = [
    {name: "rainbow lakes", image:"https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c722778d5934dc151_340.jpg"},
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