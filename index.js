var express = require('express');
const sendTextMessage = require('./utils').sendTextMessage;
const sendImageMessage = require('./utils').sendImageMessage;

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
