const request = require('request-promise');
const fs = require('fs');

const PAGE_ACCESS_TOKEN = 'EAANRZAubz2BoBACW4RrzdyIhOM8yxt02R2Evl9suoWgzt0gS3hwoVzeobbjitflbVZCvOiEyvu5amUN4ZBxbSZCPIw2UhAZCeVMvn3hM8nlrYRasoO07JYMZCy7npdorSwf6nm4fj2YngnNpb1Op64wnY0evxwnJOFTgmxuZC2AGQZDZD'

function sendTextMessage(sender, text) {
    messageData = {
        text: text
    }
    return sendMessage(sender, messageData)
}

function sendImageMessage(sender, title, imageurl) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": title,
                    "image_url": imageurl
                }]
            }
        }
    };
    return sendMessage(sender, messageData)
}

function sendMessage(sender, messageData) {
    return request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }).then(function (response) {
        if (response.body && response.body.error) {
            console.log(response.body.error);
        }
    }).catch(error => {
        console.log('Error sending message: ', error);
    });
}

function download(uri, filename) {
    return new Promise(resolve => {
        request.head(uri, function (err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
        });
    })
}

function checkIfRedbullFridgePic(filePath) {
    return download(filePath, './test.png')
        .then(() => {
            const formData = {
                token: '27317e6860f549c4',
                image: fs.createReadStream('./test.png')
            };

            return request({
                method: 'POST',
                url: 'https://search.craftar.net/v1/search',
                formData: formData,
                json: true
            }).then(body => body.results.length != 0)
        })
}

module.exports = {
    sendTextMessage: sendTextMessage,
    sendImageMessage: sendImageMessage,
    checkIfRedbullFridgePic: checkIfRedbullFridgePic
};