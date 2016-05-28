const request = require('request-promise');

const PAGE_ACCESS_TOKEN = 'EAANRZAubz2BoBACqalZCPkekBGJ82MxpoDJC1fZAor0v3t5gGs9zFJ3oHHceLp2GKkNVJrhivgDN2sTIqyWPT4tArebBPYh62bjsnEmfHrZCazsDfyWJtGJccI2w8r6XKmGYGhXrVM9tz1tftUZAyhVJHh53JREBYkczgifiqRgZDZD'

function sendTextMessage(sender, text) {
    messageData = {
        text: `callback ${text}`
    }
    sendMessage(sender, messageData)
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
    sendMessage(sender, messageData)
}

function sendMessage(sender, messageData) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }).then(function (response) {
    }).catch(error => {
        console.log('Error sending message: ', error);
    });
}

module.exports = {
    sendTextMessage: sendTextMessage,
    sendImageMessage: sendImageMessage
};