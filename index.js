require('dotenv').config()
const express = require("express");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
console.log('mongodb+srv://RAGAdox:'+process.env.MONGO_ATLAS_PW+'@filejs-c1fms.mongodb.net/LinkDB?retryWrites=true')
mongoose.connect('mongodb+srv://RAGAdox:'+process.env.MONGO_ATLAS_PW+'@filejs-c1fms.mongodb.net/LinkDB?retryWrites=true',{ useNewUrlParser: true });

app.use(fileUpload());

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.use('/', require('./routes/FileUpload.js'));
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log("Server Started at post : " + PORT));
