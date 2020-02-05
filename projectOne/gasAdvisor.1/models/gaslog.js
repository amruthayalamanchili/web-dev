var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var logSchema = new mongoose.Schema({
    price :{type:Number , default:0},
    total : {type:Number,default:0},
    calc :{type:Number,default:0}
});

logSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Log",logSchema)