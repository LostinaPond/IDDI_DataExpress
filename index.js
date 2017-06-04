var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongoose = require('mongoose'),
    sessions = require('express-sessions'),
    bodyparser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('./config.json'),
    hash;

var app = express();
app.set('view engine', 'pug');
app.set('views',__dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));

app.get('/', function(req, res){
     var obj = {
        title: "The Data Express"
    };
   res.render('Index', {
        "obj" : obj,
       "config": config
   });
    
});
app.get('/:viewname', function(req, res){
    var obj = {
        title: req.params.viewname
    };

   res.render(req.params.viewname, {
        "obj" : obj,
       "config": config
   });
    
});

//bcrypt.hash(, null, null, function(err, hash){
//    bcrypt.compare(, hash, function(err, res){
//        
//    });
//    bcrypt.compare(, hash, function(err, res){
//        
//    });
//})

//app.post('/', urlencodedParser, function(req, res){
//    for(var i = 0; i < .length; i++){
//        if(req.body.username ==  && req.body.password == ){
//            req.session.user = {isAuthenticated: true, username: req.body.username};
//            res.redirect('/private');
//        }else{
//            res.redirect('/logout');
//        }
//    }
//});

app.listen(3000);