/**
 * Created by dell on 22/3/18.
 */
var User = require('../routes/db');

function saveData(data, callback) {
    var newUser = User({
        customerID: data.custId,
        name: {
            first: data.first,
            last: data.last
        },
        birthday: data.birth,
        gender: data.gender,
        lastContact: data.contact,
        customerLifetimeValue: data.cltm
    });

    newUser.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            callback(data);
        }
    });
}

function getData(data, callback) {
    User.find({}, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            callback(data);
        }
    });
}

function editData(data, callback) {
    User.findById({_id: data._id}, function (err, user) {
        if (err) {
            throw err;
        }
        else{
            user.customerID = data.custId;
            user.name.first = data.first;
            user.name.last = data.last;
            user.gender = data.gender;
            user.birthday = data.birth;
            user.lastContact = data.contact;
            user.customerLifetimeValue = data.cltm;

            // save the user
            user.save(function (err) {
                if (err) throw err;
            });

            callback(data);
        }
    });
}

function deleteData(data,callback){
    User.findOneAndRemove({ _id: data._id }, function(err,data) {
        if (err) {
            throw err;
        }else{
            console.log('User deleted!');
            callback(data)
        }
    });
}

module.exports = {
    savedata: saveData,
    getdata: getData,
    editdata: editData,
    deletedata:deleteData
};