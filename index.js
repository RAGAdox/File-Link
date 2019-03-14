const express = require("express");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
//require("./models/db");
const testFolder = "./uploads/";
const fs = require("fs");
let filelist = [];
let links = [];
const linkDB = require('./models/links');
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
mongoose.connect('mongodb+srv://RAGAdox:'+process.env.MONGO_ATLAS_PW+'@filejs-c1fms.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

app.use(fileUpload());

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.use('/', require('./routes/FileUpload.js'));
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log("Server Started at post : " + PORT));
