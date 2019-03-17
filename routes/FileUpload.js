var express = require('express');
const path = require("path");
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const linkDB = require("../models/links");
let filelist = [];
let links = [];
const fs = require("fs");
var router = express.Router();
router.get("/", (req, res) =>{
    linkDB.find()
    .exec()
    .then(doc=>{
        //console.log(doc[0].link)
        links=[];
        doc.forEach(obj=>{
            links.push(obj.link)
        })
        res.render("index", {
            title: "Files App",
            filelist,
            links
        })
    })
    .catch(err=>{console.log(err)});
    
}
);
router.post("/links", (req, res) => {
    // res.send(req.body.name);
    //console.log(req.body.name);
    const linkModel = new linkDB({
        _id: new mongoose.Types.ObjectId(),
        link: req.body.name
    });
    linkModel.save().then(result => {
        console.log(result.link);
        links.push(result.link);
        res.redirect("/");
    }).catch(err => console.log('Error Ocured ' + err));

});
router.post("/upload", function (req, res) {
    let sampleFile;
    let uploadPath;
    //console.log(req.files);
    if (Object.keys(req.files).length == 0) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    //console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.sampleFile;

    // uploadPath = __dirname + "/uploads/" + sampleFile.name;
    console.log(path.join(("../" + __dirname) + "/uploads/" + sampleFile.name));

    uploadPath = path.join("./uploads/" + sampleFile.name);
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        //res.send('File uploaded to ' + uploadPath);
        filelist.push(sampleFile.name);
        res.redirect("/");
    });
});

router.get("/downloadFile/:file", (req, res) => {
    console.log(req.params.file);
    res.download("./uploads/" + req.params.file.substring(1), err => {
        if (err == null) console.log("File Transfered Successfully");
        else console.log("error ocured" + err);
    });
});
fs.readdir("./uploads", (err, files) => {
    files.forEach(file => {
        //console.log(file);
        filelist.push(file);
    });
});
module.exports = router;