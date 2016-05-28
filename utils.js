const request = require('request-promise');

const PAGE_ACCESS_TOKEN = 'EAANRZAubz2BoBAMZCKOxBSi0ZAZCet2kHifsvW76kTHIUYZC5cfEYocrtxBZAL9LzdFrMyrZCSvsGeVuPEfjc4LaocJ71ZCovwVCye9jU8iaLkHqis9IQ2HasZBgJCR9pZAukvgBYv31w6BtSzLFYgoFZAt0ZAeIT8NqAYz4B3xVly1FwwZDZD'

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