var express = require ("express");
var app = express();
var port = process.env.PORT;
var todoRoutes = require("./routes/todos");
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/todos",todoRoutes);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/",function(req,res){
    res.sendFile("index.html");
})

app.listen(port,function(){
    console.log("APP IS RUNNING ON PORT:" + process.env.PORT);
})