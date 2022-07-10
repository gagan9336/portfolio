require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sendWelcomeEmail } = require('./account');
// const { sendMail } = require('./acc');
const Blog = require('./models/blog');
const methodOverride = require('method-override');
var mongoose = require('mongoose');
var moment = require('moment');

// MongoDB Connection
const db = process.env.MONGODB_URL;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

const port = process.env.PORT || 9911

// My Portfolio Link
app.get("/", (req, res) => {
    res.render("landing");
});

app.post('/', (req, res) => {
    const User = req.body;
    sendWelcomeEmail(User.name, User.email, User.message);
    res.redirect('/');
});

// My Blog Link
app.get("/blog", (req, res) => {
    Blog.find({}, (err, allblog) => {
        if (err) {
            console.log(err);
        } else {
            res.render("blog", { blog: allblog, currentUser: req.user });
        }
    });
});

app.post("/blog", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var image = req.body.image;
    var createdAtDate = moment().format('LL');
    var createdAtTime = moment().format('LT');

    var blogSection = {
        title: title,
        description: description,
        image: image,
        createdAtDate: createdAtDate,
        createdAtTime: createdAtTime,
    };
    console.log(blogSection);

    Blog.create(blogSection, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    });
});

// Blog Writing
app.get("/blog/write-945933", (req, res) => {
    res.render("writing");
})

// Full Blog Read
app.get('/blog/:slug', (req, res) => {
    Blog.findOne( {slug: req.params.slug}, (err, blogging) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show-blog", { blog: blogging});
        }
    });
});

//Update Blog
app.get("/blog/:slug/update-945933", (req, res) => {
    Blog.findOne({ slug: req.params.slug }, (err, blogging) => {
        if (err) {
            console.log(err);
        } else {
            res.render("update", { blog: blogging });
        }
    });
});

app.put("/blog/:slug", (req, res) => {
    Blog.findOneAndUpdate({slug: req.params.slug }, req.body.blog, (err, blogging) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blog/"+ blogging.slug);
        }
    });
});

// Server listen Port
app.listen(port, () => {
    console.log('server is up on port ' + port);
});