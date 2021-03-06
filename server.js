var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']);
var bodyparser=require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

app.get('/contactlist',function(req,res){

console.log("Get recieved")
db.contactlist.find(function(err,docs){

console.log(docs);
res.json(docs);

});
});
app.post('/contactlist',function(req,res){

console.log("POST"+req.body);
db.contactlist.insert(req.body,function(err,doc){
res.json(doc);

})
}); 


app.delete('/contactlist/:id',function(req,res){
var id=req.params.id;
console.log("de id"+id)
db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
	
	res.json(doc);
})

});



app.get('/contactlist/:id',function(req,res){


var id=req.params.id.toString();
console.log("MM"+id);



db.contactlist.findOne({_id: req.params.id},function(err,docs){

console.log("Edit docs"+docs);
res.json(docs);

});


});

app.put('/contactlist/:id',function(req,res){


var id=req.params.id;
console.log("put"+req.body.name);

db.contactlist.findAndModify({query:{_id:req.params.id},
update: {
	$set: {name:req.body.name,email:req.body.email,number:req.body.number }},
	new:true},function(err,doc){
res.json(doc);


	}
	);
});




app.listen(3000);
console.log("server on port 3000")
