var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

mongoose.connect("mongodb://localhost:27017/blog-app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});



var Blog = mongoose.model("Blog", blogSchema);

// ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function (err, blogs){
        if (err){
            console.log("ERROR!");
        }
        else {
            res.render("index", {blogs: blogs});
        }
    })
});

app.get("/blogs/new", function(req, res){
    res.render("new")
});

app.post("/blogs", function(req, res){
    if (!req.body.blog.body){
        res.redirect("/blogs/new");
        return;
    }
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render("new");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log(err);
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: foundBlog});
        }
    })
});

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log(err);
            res.redirect("/blogs");
        }
        else {
            res.render("edit", {blog: foundBlog});
        }
    })
});

app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err){
            res.redirect("/blogs");
        }
        else {
            res.redirect("/");
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});