var express=require('express');
var app=express();
var mongoose=require('mongoose');
// mongojs=require('mongojs');
 //db=mongojs('contactlist',['contactlist']);

var user=require('./user');
var book=require('./book');
var bodyParser=require('body-parser');
var db ='mongodb://localhost/example';
mongoose.connect(db);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
   




//app.get('/contactlist', function(req, res) {
//    console.log('HAJDE');
//  user.find({}, function(err, users) {
//    var userMap = {};
//
//    users.forEach(function(user) {
//      userMap[user._id] = user;
//    });
//
//    res.send(userMap);  
//  });
//});





app.get('/contactlist',function(req,res){
   console.log('Sve Useri');
    user.find({})
    .exec(function(err,users){
    if(err){
        res.send('error has occured');
    }
        else{
            console.log(users);
        res.json(users);
        }
    });
});

app.get('/books',function(req,res){
   console.log('Sve knjige');
    book.find({})
    .exec(function(err,books){
    if(err){
        res.send('error has occured');
    }
        else{
            console.log(books);
        res.json(books);
        }
    });
});

//app.get('/user/:id', function(req,res){
//user.findOne({
//    _id:req.params.id
//})
//.exec(function(err,user){
//if(err){
//    res.send('error occured');
//}
//    else{
//    console.log(user);
//    res.json(user);
//    }
//})
//})



app.post('/contactlist', function(req,res){
  var newUser=new user();
    
   newUser.name=req.body.name;
   newUser.email=req.body.email;
   newUser.number=req.body.number;
    
    newUser.save(function(err,users){
        if(err){
            res.send('error saving book');
        }else{
            console.log(users);
            res.send(users);
        }
    });
});
app.post('/books', function(req,res){
  var newBook=new book();
    
    newBook.title=req.body.title;
    newBook.author=req.body.author;
    newBook.category=req.body.category;
    
    newBook.save(function(err,books){
        if(err){
            res.send('error saving book');
        }else{
            console.log(books);
            res.send(books);
        }
    });
});


//app.get('/contactlist',function(req,res){
//console.log("Primio sam Get zahtjev");
//   db.contactlist.find(function (err,docs) {
//   	// body...
//   	console.log(docs);
//   	res.json(docs);
//   });
//});
//mongoose.model('Korisnici',{name: String});
// app.get_novi('/users',function(req,res){
// mongoose.model('users').find(function(err,users){
// res.send(users);
// });
// });
//app.post('/contactlist',function(req,res){
//console.log(req.body);
//db.contactlist.insert(req.body,function(err,doc){
//res.json(doc);
//})
//});

//app.delete('/contactlist/:id',function(req,res){
//var id=req.params.id;
//console.log(id);
//db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
//	res.json(doc);
//})
//});

app.delete('/contactlist/:id',function(req,res){
    user.findOneAndRemove({
        _id:req.params.id
    }, function(err,user){
        if(err){
            res.send('greska u brisanju');
        }
        else{
            console.log(user);
            res.status(204);
        }
    });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.get('/books/:id', function(req,res){
Book.findOne({
    _id:req.params.id
})
.exec(function(err,book){
if(err){
    res.send('error occured');
}
    else{
    console.log(book);
    res.json(book);
    }
})
})


app.put('/books/:id', function(req,res){
   Book.findOneAndUpdate({_id: req.params.id},
    {$set: {title: req.body.title }},
                         {upsert:true},      
        function(err,newBook){
    if(err){
    console.log('greska');
    }else{
    console.log(newBook);
        res.send(newBook);
    }
    });
});
app.delete('/books/:id',function(req,res){
    Book.findOneAndRemove({
        _id:req.params.id
    }, function(err,book){
        if(err){
            res.send('greska u brisanju');
        }
        else{
            console.log(Book);
            res.status(204);
        }
    });
});

app.listen(3000);
console.log("Server running at port 3000");