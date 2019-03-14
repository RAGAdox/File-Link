const mongoose = require('mongoose');
const linksSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    link:String
});
const links=mongoose.model('Links',linksSchema);
module.exports=links;
