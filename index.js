var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongoose = require('mongoose'),
    sessions = require('express-session'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    route = require('./routes/routes.js'),
    config = require('./config.json'),
    cookieParser = require('cookie-parser'),
    hash;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var checkAuth = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

var app = express();
app.set('view engine', 'pug');
app.set('views',__dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));
app.use(cookieParser());
app.use(sessions({secret: '5ecretP455c0de', saveUninitialized: true, resave: true}));

//app.get('/', route.index);
app.get('/', function(req, res){

    res.cookie('lastVisited', new Date().toUTCString());

    console.log(req.cookies.lastVisited);
    //res.send(req.cookies.lastVisited);
    res.render('index', {
        title: "The Data Express",
       "config": config,
       "lastVisited": req.cookies.lastVisited
    });
})
app.get('/admin', route.admin);
app.get('/account', route.account)
app.get('/make', route.make);
app.get('/edit/:id', route.edit);
app.get('/login', route.login);
app.post('/make', urlencodedParser, route.makeAccount);
app.post('/edit/:id', urlencodedParser, route.editAccount);
app.post('/login', urlencodedParser, function (req, res){
    console.log(req.body.username);
    console.log(req.body.password);
     if (req.body.username == 'admin' && req.body.pass == 'pass') {
        req.session.user = { isAuthenticated: true, username: req.body.username};
        res.redirect('/admin');
    } else {
        // logout here so if the user was logged in before, it will log them out if user/pass wrong
        res.redirect('/logout');
    }
})
app.get('/delete/:id', route.delete);
app.get('/logout', function (req, res) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/login');
        }
    });

});

app.post('/login', urlencodedParser, function(req, res){
     route.findOne({'account.username': username}, function (err, account) {
         if(bcrypt.comparesync(password, account.password)){
             req.session.user = {isAuthenticated: true, username: req.account.username};
             res.redirect('/');
         }else{
             res.redirect('/logout');
         }
     });
});

function saveUser(username, password, email, age, answer1, answer2, answer3){
    var newUser = User({
        username: username,
        password: password,
        userLevel: false,
        email: email,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3
    });
    newUser.save(err);
    console.log('user saved');
}

app.listen(3000);