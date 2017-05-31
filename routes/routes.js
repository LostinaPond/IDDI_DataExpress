var bcrypt = require("bcrypt-nodejs");
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


exports.createAccount = function(req, res){

    bcrypt.hash(req.body.password, null, null, function(err, hash){

        var account = new Account({
        username: req.body.username,
        password: hash,
        userLevel: req.body.userLevel,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3
        });
    });
    account.save(function (err, account){
        console.log('Username: ' + req.body.username + ' with userlevel: ' + userLevel + ' was created');
    });

    res.redirect('/');
};

exports.editAccount = function (req, res){
    Account.findById(req.params.id, function (err, account){

        bcrypt.hash(req.body.password, null, null, function(err, hash){

            account.username = req.body.username;
            account.password = hash;
            account.userLevel = req.body.userLevel;
            account.email = req.body.email;
            account.age = req.body.age;
            account.answer1 = req.body.answer1;
            account.answer2 = req.body.answer2;
            account.answer3 = req.body.answer3;
        })

        account.save(function (err, account){
            console.log('Username: ' + req.body.username + ' has been updated');
        })
    });

    res.redirect('/');
}

exports.delete = function(req, res){
    Account.findByIdAndRemove(req.params.id, function(err, account){
        res.redirect('/');
    })
}

exports.details = function (req, res){
    Account.findById(req.params.id, function (err, account){
        //res.render()
    })
}