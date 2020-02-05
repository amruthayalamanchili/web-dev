var express = require("express");
var app = express();

var bodyParser = require("body-parser") ;

var mongoose = require("mongoose");
// var passport = require("passport");
// var LocalStrategy = require("passport-local");

mongoose.connect("mongodb://localhost:27017/calculations",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

var resultSchema = new mongoose.Schema({
    a :{type:Number},
    b : {type:Number},
    result : { type :Number}
});

var Result = mongoose.model("Result",resultSchema);
app.get("/",function(req,res){
    res.render("home");
});

// app.post("/sum", function(req, res){
//   var a = parseFloat(req.body.numa);
//   var b = parseFloat(req.body.numb);
//   var newresult = (a/b);
//   result.push(newresult);
//   res.redirect("/results");

//  });
 
//  //  app.get("/results" ,function(req,res){
// //      res.render("results",{result:result});
// //  }

         
 app.post("/sum", async function(req, res){

    // get data from form and add to campgrounds array

    var a = parseFloat(req.body.numa);

    var b = parseFloat(req.body.numb);
    
    function divide(a,b){
                 var result = a/b;
                 return result;
             }

    var newResult = divide(a,b);
    console.log(newResult);

    var newValue = {a : a, b: b, newResult: newResult}

    // Create a new campground and save to DB

    Result.create(newValue, function(err, newlyCreated){

        if(err){

            console.log(err);

        } else {

            //redirect back to campgrounds page

            res.redirect("/results");

        }

    });

});
 

 
app.get("/results", function(req, res){

    // Get all campgrounds from DB

    Result.find({}, function(err, allResults){

       if(err){

           console.log(err);

       } else {

          res.render("results",{result:allResults});

       }

    });

});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("calculations running");
});