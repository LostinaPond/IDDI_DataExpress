var bcrypt = require("bcrypt-nodejs"),
    config = require('../config.json');
var hash;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var accountSchema = mongoose.Schema({

    username: String,
    password: String,
    userLevel: String,
    email: String,
    age: String,
    answer1: String,
    answer2: String,
    answer3: String
});

var Account = mongoose.model('Account_Collection', accountSchema);

exports.account = function(req, res){

    res.render('account', {
        title: 'User Account',
        "config": config
    });
};

exports.admin = function(req, res) {
    Account.find(function(err, account){
        if(err) return console.error(err);
        res.render('admin', {
            title: 'Admin',
            "config": config,
            accounts: account,
        });
    });
};

exports.login = function(req, res){

    res.render('login', {
        title: 'Login',
        "config": config
    })
}

exports.make = function(req, res){
    
    res.render('make', {
        title: 'Make an Account',
        "config": config
    });
};

exports.makeAccount = function(req, res){

    bcrypt.hash(req.body.password, null, null, function(err, hash){

        console.log('pass: ' + req.body.password + ' hash: ' + hash);

        var account = new Account({
            username: req.body.username,
            password: hash,
            userLevel: 'user',
            email: req.body.email,
            age: req.body.age,
            answer1: req.body.q1,
            answer2: req.body.q2,
            answer3: req.body.q3
        });

        account.save(function (account){
        console.log('Username: ' + req.body.username + ' with password: ' + hash + ' was created');
        });

        res.redirect('/');
    });
    
};

exports.edit = function(req, res){
    Account.findById(req.params.id, function (account){
        res.render('edit', {
            title: 'Edit Account',
            account: account
        })        
    });
};

exports.editAccount = function (req, res){
    Account.findById(req.params.id, function (err, account){

        bcrypt.hash(req.body.password, null, null, function(hash){

            //account.username = req.body.username;
            account.password = hash;
            account.userLevel = 'user';
            account.email = req.body.email;
            account.age = req.body.age;
            account.answer1 = req.body.q1;
            account.answer2 = req.body.q2;
            account.answer3 = req.body.q3;
        })

        account.save(function(account){
            console.log('Username: ' + req.body.username + ' has been updated');
        })
    });

    res.redirect('/admin');
    //res.redirect('/');
};

exports.delete = function(req, res){
    Account.findByIdAndRemove(req.params.id, function(account){
        res.redirect('/admin');
    });
};

exports.index = function(req, res){
    
    // var obj = {
    //     title: "The Data Express"
    // };
   res.render('index', {
        title: "The Data Express",
       "config": config
   });
    
    // res.render('index', {
    //     title: 'Home'
    // });
};

// exports.details = function (req, res){
//     Account.findById(req.params.id, function (err, account){
//         //res.render()
//     })
// }