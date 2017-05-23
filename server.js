const express = require('express');
const bodyParser = require('body-parser');
const MongoClient =  require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect('mongodb://mufc:mufc@ds149481.mlab.com:49481/mufc-crud',{connectTimeoutMS: 60000, socketTimeoutMS: 60000, keepAlive: true}, function (err, database) {
    if(err) {
        return console.log('db error', err);
    }
    db = database;
    app.listen(9999, function () {
        console.log('Listening on port:9999');
    });
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/goals', function (req, res) {
    console.log('post', req.body);
    db.collection('goals').save(req.body, function (err, result) {
        if(err) {
            return console.log(err);
        }
        console.log('saved to database');
        res.redirect('/');
    })
});

