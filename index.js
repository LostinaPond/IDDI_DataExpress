var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongoose = require('mongoose'),
    sessions = require('express-sessions'),
    bodyparser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    route = require('./routes/routes.js'),
    config = require('./config.json'),
    hash;

//var Account = mongoose.model('Account', route.accountSchema);

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

//function toHash(username, password){
//    bcrypt.hash(password, null, null, function (err, hash) {
//        console.log(hash);
//        bcrypt.compare(password, hash, function (err, res) {
//            
//        });
//    });
//}

//app.post('/', urlencodedParser, function(req, res){
//        if(req.body.username ==  && req.body.password == ){
//            req.session.user = {isAuthenticated: true, username: req.body.username};
//            res.redirect('/private');
//        }else{
//            res.redirect('/logout');
//        }
//    }
//});

function loginCompare(username, password) {
     route.findOne({'account.username': username}, function (err, account) {
         console.log(account.password);
     });
 }

function saveUser(){
    
}

app.listen(3000);