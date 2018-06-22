var mongoose = require('mongoose');
mongoose.connect('mongodb://mohit:dmohitj1@ds133271.mlab.com:33271/mytask_mohit');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    customerID: String,
    name:{
        first: String,
        last:String,
    },
    birthday: String,
    gender: String,
    lastContact:String,
    customerLifetimeValue:String
},{collection:'test'});

var getdata = mongoose.model('getdata',userSchema);

module.exports = getdata;
