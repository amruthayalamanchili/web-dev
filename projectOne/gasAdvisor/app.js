var express = require("express");
var app = express();
var bodyParser = require("body-parser") ;
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User  = require("./models/users");
var Log = require("./models/gaslog");
var Sum = require("./models/log");



mongoose.connect("mongodb://localhost:27017/gas-advisor",{useNewUrlParser:true});
var db=mongoose.connection;
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//passport configuration
app.use(require("express-session")({
    secret:"gas",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/",function(req,res){
    var currentUser = req.user;
    res.render("index.ejs",{currentUser});
});

app.get("/profile",function(req,res){
    res.render("profile.ejs");
})

app.get("/stats",function(req,res){
    res.render("stats.ejs")
})

app.get("/gaslog",function(req,res){
    res.render("gaslog.ejs");
})
app.get("/addPrice",function(req,res){
    res.render("logDetails");
})

app.get("/logDetails",function(req,res){
    res.render("logDetails.ejs");
    
    
})
app.post("/logDetails",function(req,res){
    var price = parseFloat(req.body.price);
    var total = parseFloat(req.body.total);
    console.log(price);
    console.log(total);
    res.render("logDetails");
})

// app.post("/gaslog",function(req,res){
//   var price = new Log({price:parseFloat(req.body.price)});
//   console.log(price);
//   var total = parseFloat(req.body.total);
//   var calc = (total/price);
//   console.log(calc);
// var newLog = {price:price,total:total,calc:calc};
// Log.create(newLog,function(err,calc){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("calc")
//     }
// })
//     res.render("gaslog.ejs",{calc:calc})
// })



// app.post('/add', function(req, res){
//   var a = parseFloat(req.body.numa);
//   var b = parseFloat(req.body.numb);
//   console.log(a);
//   console.log(b);
//   //res.render("logDetails" , {result});
// //   Sum.create(newSum,function(err,calc){
// //       if(err){
// //           res.render(err);
// //       }else{
// //           res.redirect("logDetails",{sum:calc});
// //       }
// //   })
  
//  });
//Auth routes

//Register routes
app.get("/register",function(req,res){
    
    res.render("signup.ejs")
});


app.post('/register', function(req, res) {
    // var name = new User({username:req.body.username});
    // var pass = req.body.password;
    // console.log(name);
    // console.log(pass);
    User.register(new User({ username: req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});






//Login routes
app.get("/login",function(req,res){
    res.render("login.ejs")
});

app.post("/login",passport.authenticate("local",
{
    successRedirect:"/",
    failureRedirect:"/login"
}
),function(req,res){
    
});

//logout routes
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("gasAdvisor running");
});