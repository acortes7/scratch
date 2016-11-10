var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contactlist',['contactlist']);
var bodyParser= require("body-parser");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function(req, res){
     console.log("I received a Get request");

     db.contactlist.find(function(err,docs){
       console.log(docs);
       res.json(docs);
     });
    //  person1={
    //    name: "Fin",
    //    email: "fin@hello.com",
    //    number: "111-111-1111"
    //  };
    //  person2={
    //    name: "John",
    //    email: "John@hello.com",
    //    number: "111-111-2222"
    //  };
    //  person3={
    //    name: "Ana",
    //    email: "Ana@hello.com",
    //    number: "111-222-1111"
    //  };
    //  var contactList =[person1,person2,person3];
    //  res.json(contactList);
 });

 app.post("/contactlist", function(req,res){
   console.log(req.body);
   db.contactlist.insert(req.body,function(err,dovs){
     res.json(docs);
   });
 });
 app.delete('/contactlist/:id', function(req,res){
   var id = req.params.id;
   console.log(id);
   db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
     res.json(doc);
   });
 });
app.get('/contactlist/:id',function(req,res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
  res.json(doc);
  });
});

app.put('/contactlist/:id',function(req,res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findAndModify(
    { query: {_id: mongojs.ObjectId(id)},
      update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
       new: true
    },function(err,doc){
      res.json(doc);
    });
});

app.listen(3000);
console.log("Server running on port 3000");
