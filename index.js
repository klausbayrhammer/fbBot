var express = require('express');
const request = require('request-promise');
const game = require('./game');

var bodyParser = require('body-parser');
const VERIFY_TOKEN = 'thisIsTheHotShit';

var app = express();
app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
    console.log('GET');
    console.log(req);
    res.end('ok');
});

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if(event.message && event.message.text) {
            game(sender, event);
        }
    }
    res.sendStatus(200);
});

var server = app.listen(process.env.PORT || 3000,() => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});


const checkIfRedbullFridgePic = require('./utils').checkIfRedbullFridgePic;

app.get('/test', function(req, res){
    checkIfRedbullFridgePic('/Users/mgutjahr/projects/botcamp/IMG_0047.JPG')
});
