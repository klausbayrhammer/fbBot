var express = require('express');
const sendTextMessage = require('./utils').sendTextMessage;
const sendImageMessage = require('./utils').sendImageMessage;

const request = require('request');
const _ = require('lodash');

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
        if (event.message && event.message.text) {
            text = event.message.text;
            if(text === 'Hi')
                sendTextMessage(sender, text);
            else
                sendImageMessage(sender, 'Who is this guy' , 'https://image.redbull.com/rbcom/010/2016-03-22/1331784064832_1/0010/1/150/100/1/nicolas-mller-beim-banked-slalom.jpg')
            console.log(event);
        }
    }
    res.sendStatus(200);
});

var server = app.listen(process.env.PORT || 3000,() => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});

const challenge = {
    "challengeType": "guessAthlete",
    "athleteId": "1331578987345"
};


function getAthleteById(athleteId) {
    request({
        url: `http://api.redbull.com/v2/athletes/${athleteId}/locales/en_int`,
        method: 'GET'
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else {
            const respObj = JSON.parse(body);
            const athleteObj = respObj.athletes[0];
            return {
                name: athleteObj.name,
                birthdate: athleteObj.birthdate,
                birthplace: athleteObj.birthplace,
                surname: athleteObj.surname,
                firstname: athleteObj.firstname,
                image: athleteObj.images[0].imageurl
            };
        }
    })
}

app.get('/ch1', function(req, res){
    console.log()
    res.sendStatus(200)
});