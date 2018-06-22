var express = require('express');
var router = express.Router();
var getUsers = require('../queries/dbqueries');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/getusers',function (req,res) {
    getUsers.getdata(req.body,function (data) {
        res.send(data);
    });
});

router.post('/save',function (req,res) {
    getUsers.savedata(req.body,function (data) {
        res.send(data);
    });
});

router.post('/edit',function (req,res) {
    getUsers.editdata(req.body,function (data) {
        res.send(data);
    });
});

router.post('/deletedata',function (req,res) {
    getUsers.deletedata(req.body,function (data) {
        res.redirect('/getusers');
    });
});


router.get('*', function(req, res, next) {
    res.redirect("/")
});

module.exports = router;
