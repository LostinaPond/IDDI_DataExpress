var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongoose = require('mongoose'),
    sessions = require('express-session'),
    bodyparser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    route = require('./routes/routes.js'),
    config = require('./config.json'),
    hash;

//var Account = mongoose.model('Account', route.accountSchema);

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

app.use(sessions({secret: '5ecretP455c0de', saveUninitialized: true, resave: true}));

app.get('/', route.index);
app.get('/admin', route.admin);
app.get('/account', route.account)
app.get('/make', route.make);
app.get('/edit/:id', route.edit);
app.get('/login', route.login);
app.post('/make', urlencodedParser, route.makeAccount);
app.post('/edit/:id', urlencodedParser, route.editAccount);
app.post('/login', urlencodedParser, function (req, res){

     if (req.body.username == 'admin' && req.body.password == 'pass') {
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