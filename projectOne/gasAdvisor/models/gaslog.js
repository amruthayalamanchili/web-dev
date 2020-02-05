var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var logSchema = new mongoose.Schema({
    price :String,
    total : String,
    calc :String
});

logSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Log",logSchema)