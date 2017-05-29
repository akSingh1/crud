const express = require('express');
const bodyParser = require('body-parser');
const MongoClient =  require('mongodb').MongoClient;
//const mongoose =  require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
var db;

MongoClient.connect('mongodb://localhost:27017/myproject', function (err, database) {
    if(err) {
        return console.log('db error', err);
    }
    db = database;
    app.listen(9999, function () {
        console.log('Listening on port:9999');
    });
});


app.get('/', function (req, res) {
    db.collection('goals').find().toArray(function (err, results) {
        if(err) {
            return console.log('Error in collection');
        }
        res.render('index.ejs', {goals:results});
    })
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

app.put('/goals', function (req, res) {
    db.collection('goals').findOneAndUpdate({'player':'rooney'},
        {$set: {
            player: req.body.player,
            goals: req.body.goals
        }},
        {
            sort: {_id: -1},
            upsert: true
        },
        function (err, result) {
            if(err) {
                return res.send(err);
            }
            res.send(result);
        });
});

app.delete('/goals', function (req, res) {
    db.collection('goals').findOneAndDelete({'player':req.body.player},
        function (err, result) {
            if(err) {
                return res.send(500, err);
            }
            res.send({success:'Delete successful.'});
        });
})

