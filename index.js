var express = require('express');

var app = express();

app.get('/', (req, res) => {
    console.log('GET');
    console.log(req);
    res.end('ok');
});

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'thisIsTheHotShit') {
        res.send(req.query['hub.challenge']);
    }
 console.log(req);
    res.send('Error, wrong validation token');
});
var server = app.listen(process.env.PORT || 3000,() => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
