const express       = require("express"),
    app             = express(),
    methodOverride  = require("method-override"),
    session         = require("express-session"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    cookieParser    = require("cookie-parser"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    SeedDB          = require("./seeds"),
    port            = 5555.
    password        = process.env.PASSWORD

// config dotenv
// require('dotenv').load()

// require routes
const commentRoutes      = require("./routes/comments"),
      campgroundRoutes   = require("./routes/campgrounds"),
      indexRoutes        = require("./routes/index")


mongoose.connect(`mongodb+srv://kaylacrow:${password}@cluster0-inqef.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`))
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())
// SeedDB(); //seed the database - deletes all camps and fills in with seed data - errors because no author id

// passport config
app.use(require("express-session")({
    secret: "wasn't me",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//require moment
app.locals.moment = require("moment")

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

app.use("/", indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(port, err => {
    if (err) console.log(err);
    console.log("server is running, hold on to your butts")
})