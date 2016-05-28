const request = require('request-promise');

const PAGE_ACCESS_TOKEN = 'EAANRZAubz2BoBACW4RrzdyIhOM8yxt02R2Evl9suoWgzt0gS3hwoVzeobbjitflbVZCvOiEyvu5amUN4ZBxbSZCPIw2UhAZCeVMvn3hM8nlrYRasoO07JYMZCy7npdorSwf6nm4fj2YngnNpb1Op64wnY0evxwnJOFTgmxuZC2AGQZDZD'

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
        if(response.body.error) {
            console.log(response.body.error);
        }
    }).catch(error => {
        console.log('Error sending message: ', error);
    });
}

module.exports = {
    sendTextMessage: sendTextMessage,
    sendImageMessage: sendImageMessage
};