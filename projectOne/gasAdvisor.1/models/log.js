var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var sumSchema = new mongoose.Schema({
    vala :String,
    valb : String,
    sum :String
});

sumSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Sum",sumSchema)