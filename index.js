var express = require('express');
const request = require('request');

var bodyParser = require('body-parser');
const APP_TOKEN = 'thisIsTheHotShit';

var app = express();
app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
    console.log('GET');
    console.log(req);
    res.end('ok');
});

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === APP_TOKEN) {
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
            sendTextMessage(sender, text)
            console.log(event);
        }
    }
    res.sendStatus(200);
});

function sendTextMessage(sender, text) {
    messageData = {
        text:`callback ${text}`
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:APP_TOKEN},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

var server = app.listen(process.env.PORT || 3000,() => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
