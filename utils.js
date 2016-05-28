const request = require('request-promise');

const PAGE_ACCESS_TOKEN = 'EAANRZAubz2BoBAI6OdQVn6m1F3ZB7GuFpYSvp2hdZAjK6Gjo3w6BUYTMoHzWj1OZC39R699xqFmk1QpPYGaMGEMEk0vUxqZBc9P47aRGK6qOskIK3DQa9is2ZCLQePxLWIvBpdMoyk8Y92xohLK5nZCYu3rm3bW9gZBpCEzsqE571wZDZD'

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