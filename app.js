var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

mongoose.connect("mongodb://localhost:27017/blog-app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
})