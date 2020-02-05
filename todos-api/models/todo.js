var mongoose = require("mongoose");
var todoSchema = mongoose.Schema({
    name: { 
        type:String,
        required:"name cannot be blank"
    },
    completed: {
        type : Boolean,
        default:false
    },
    createdDate: {
        type:Date,
        default:Date.now
    }
});
var Todo = mongoose.model("Todo",todoSchema);
module.exports = Todo;