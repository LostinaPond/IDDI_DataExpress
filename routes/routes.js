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
    var account = new Account({
        username = req.body.username,

    })
}