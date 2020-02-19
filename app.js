const express       = require("express"),
    app             = express(),
    LocalStrategy   = require("passport-local"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    session         = require("express-session"),
    flash           = require("connect-flash"),
    SeedDB          = require("./seeds"),
    port            = 5555;

// config dotenv
// require('dotenv').load()

// require routes
const commentRoutes      = require("./routes/comments"),
      campgroundRoutes   = require("./routes/campgrounds"),
      indexRoutes        = require("./routes/index")


mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true })
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

//require moment
app.locals.moment = require('moment')

// SeedDB(); not anymore

// passport config
app.use(require("express-session")({
    secret: "wasn't me",
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use("/", indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(port, err => {
    if (err) console.log(err);
    console.log("server's running, hold on to your butts")
});