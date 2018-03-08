//check password empty
//handle not a user and user found

var express = require('express');
var fs = require('fs');
var app = express();
qs = require('querystring');
 var bodyParser =  require("body-parser");

var current_user = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/homepage'));
app.use(express.static(__dirname + '/phase1'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/homepage/HomePage.html');
  //console.log("server is running now");
});

app.get('/tasks_page', function(req, res) {
  res.sendFile(__dirname + '/phase1/To-Do List_Phase#1.html');
  //console.log("redirecting");

});

app.get('/log_in',function(req, res) {
  //console.log("login");
  var username2 = req.query.name;
   var password2 = req.query.password;
   //console.log(username2 + password2);
   var configFile = fs.readFileSync('./users.json');
   var config = JSON.parse(configFile);
   var found = false;
   var i;
   for ( i=0 ; i < config.list.length ; i++) {
     if (config.list[i].mail == username2 && config.list[i].password == password2) {
       //console.log("found");
       found=true;
       break;
     }
   }
   if (found) {
     //console.log("found");
     current_user = i;
     res.end("true");
   }
   else {
     //console.log("user not found");
     res.end("false");
   }
   //res.end();

});


app.get('/add_user', function(req, res){
  //console.log("added");

    var name1 = req.query.name1;
    var mail1 = req.query.mail1;
    var password1 = req.query.password1;
    var obj={
      name:name1,
      mail:mail1,
      password:password1,
      task:[],
      all:0,
      in:0,
      ar:0,
      c:0
    }

    var configFile = fs.readFileSync('./users.json');
    var config = JSON.parse(configFile);
    var found = false;
    for (var i=0 ; i < config.list.length ; i++) {
      if (config.list[i].mail == mail1) {
        //console.log("found");
        found = true;
      }
    }
    if (!found) {
      config.list.push(obj);
      var configJSON = JSON.stringify(config);
      fs.writeFileSync('./users.json', configJSON);
      res.end("false");
    }
   else {
     res.end("true");
   }
});

app.get('/list',function(req, res) {
  var configFile = fs.readFileSync('./users.json');
  var config = JSON.parse(configFile);
  //console.log(config.list[current_user].task);
  res.send(config.list[current_user].task);
});
app.get('/update_counters',function(req, res) {
//  console.log("couttttttttttttttttt");
  var configFile = fs.readFileSync('./users.json');
  var config = JSON.parse(configFile);
  //console.log(config.list[current_user].task);
  var array = [config.list[current_user].all,config.list[current_user].in,config.list[current_user].ar,config.list[current_user].c];
  res.send(array);
});


app.get('/update_tasks', function(req, res) {
  var configFile = fs.readFileSync('./users.json');
  var config = JSON.parse(configFile);
  var array = req.query.task;
  config.list[current_user].task = array;
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./users.json', configJSON);

});

app.get('/list_zero', function(req, res) {
  var configFile = fs.readFileSync('./users.json');
  var config = JSON.parse(configFile);
  var array = req.query.task;
  config.list[current_user].task =[];
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./users.json', configJSON);

});

app.get('/count_all', function(req, res) {
  var configFile = fs.readFileSync('./users.json');
  var config = JSON.parse(configFile);
  config.list[current_user].all = req.query.all;
  config.list[current_user].ar = req.query.ar;
  config.list[current_user].c = req.query.c;
  config.list[current_user].in = req.query.in;

  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./users.json', configJSON);

});
var server = app.listen(8888);
console.log("server is running now on port 8888");
