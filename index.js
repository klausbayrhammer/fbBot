var express = require('express');

var app = express();

app.get('/', (req, res) => {
    console.log('GET');
    console.log(req);
    res.end('ok');
});

var server = app.listen(process.env.PORT || 3000,() => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
