var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongoose = require('mongoose'),
    sessions = require('express-sessions'),
    bodyparser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('./config.json');

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

app.listen(3000);