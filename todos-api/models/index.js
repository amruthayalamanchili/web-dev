
var mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.connect("mongodb://localhost:27017/todos",{useNewUrlParser:true,useUnifiedTopology: true });
mongoose.Promise = Promise;
module.exports.Todo = require("./todo");