# dispersedCO

## Day 1
* Add landing page
* Add campgrounds page that lists all camps

Each campground has:
    * Name
    * Image
    * Cost
    * Location
    * Description

## Layout and Basic Styling
    * Create header and footer in partials folder
    * add bootstrap

## Creating New Camps
    * Set up POST route for new camp
    * Add body-parser
    * Add basic form to submit new camp

## Style Camp Page
    * Improve header/title
    * Display camps in a clean grid

## Add Data Persistance
    * Install and configure mongoose
    * Setup campground model and schema
    * Replace model inside each of our routes

## Add Show Page
    * Review restful routes
    * Add a show route/template

## Refactor Mongoose
    * Create models directory
    * Require all the things

## Add Seeds File
    * Add seeds.js
    * Run seeds.js every time the server starts

## Add Comment Model
    * Error party
    * Display comments on campgroundById page

## Comment New/Create
    * Add comment new and create routes
    * Add new comment form

## Style Camp Page
    * Add sidebar
    * Display comments nicely
    * Add public directory
    * Add custom stylesheet

## Auth Pt. 1 - Add User Model
    * Install all packages needed for auth
    * Define user model

## Auth Pt. 2 - Register
    * Configure passport
    * Add register routes
    * Add register template

## Auth Pt. 3 - Login
    * Add login routes
    * Add login template

## Auth Pt. 4 - Logout/Nav
    * Add logout route
    * Prevent comments if youre not signed in
    * Route links in navbar

## Auth Pt. 5 - Show/Hide Links
    * Only show auth links when applicable

## Refactor routes
    * Use express router ro reorganize routes and middleware

## Users + Comments
    * Associate users and comments
    * Save author's name to comment automatically    

## Editing Campgrounds
    * Add method-override
    * Add edit route for campgrounds
    * Add link to edit page
    * Add update route
    * Fix $set problem

## Deleting Campgrounds
    * add destroy route
    * add delete button

## Authorization
    * user can only edit their own camps
    * user can only delete their own camps
    * Hide/show edit/delete buttons when appropriate