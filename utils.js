const request = require('request-promise');
const fs = require('fs');
const _ = require('lodash');

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

function sendPostbackButtonMessage(sender, buttonConfig) {
    const buttons = _.map(buttonConfig, e => ({type:'postback', title: e, payload: e}));
    console.log('buttons', buttons);
    console.log('buttonConfgi', buttonConfig);
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text":"Who do you really mean",
                "buttons": buttons
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

function searchForAthletes(query) {
    return request({
        url: 'http://api.redbull.com/v2/query',
        method: 'GET',
        qs: {
            types: 'athletes',
            fields: 'name,surname',
            sortby: 'publisheddate',
            sortorder: 'desc',
            q: query
        },
        json: true
    }).then(function(response) {
        return response.result.map(resultObj => resultObj.name)
    }).catch(error => {
        console.log('Error sending message: ', error);
    });
}

function getNextRBTvShow() {
    return request({
        url: 'https://api-v2.redbull.tv/views/calendar',
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMTc4LjE5LjIwOS4yMDYiLCJnZW5kZXIiOiJtYWxlIiwib3MiOiJvc194XzEwXzEwX3lvc2VtaXRlIiwib3NfZmFtaWx5Ijoib3NfeCIsIm9mZnNldCI6MCwib3NfdmVyc2lvbiI6IjEwXzEwXzUiLCJzZXNzaW9uX2lkIjoic2Vzc2lvbnM6OjEwNDQwODkwIiwiaHlkcmF0ZSI6ZmFsc2UsImxvY2FsZSI6ImVuIiwidWEiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xMF81KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTAuMC4yNjYxLjEwMiBTYWZhcmkvNTM3LjM2IiwidHlwZSI6InNlc3Npb24iLCJxdWFsaXR5IjpudWxsLCJidWlsZCI6IjQuMC4wIiwibG9jYXRpb24iOnsic3ViZGl2aXNpb24iOm51bGwsImNpdHkiOm51bGwsInRpbWV6b25lIjpudWxsLCJsYXRpdHVkZSI6NTEuMCwiY291bnRyeV9uYW1lIjoiR2VybWFueSIsImxvbmd0aXR1ZGUiOjkuMCwicG9zdGFsX2NvZGUiOm51bGwsInN1YmRpdmlzaW9uX2lzbyI6bnVsbCwiY291bnRyeV9pc28iOiJERSJ9LCJleGNsdWRlIjpudWxsLCJmYW1pbHkiOiJjaHJvbWUiLCJjYXRlZ29yeSI6InBlcnNvbmFsX2NvbXB1dGVyIiwiaWF0IjoxNDY0NDI5ODU3LCJ0aW1lc3RhbXAiOjE0NjQ0Mjk4NTc5NjZ9.H25fl3mNRY1XOYGFodTJDGBsZB8AcSL8a6TVAtZouUY='
        },
        json: true
    }).then(data => {
        var upcomingEvent = _.find(data.blocks, e => e.label === 'Upcoming Live Events');
        const collectionLink = upcomingEvent.collection.resource.links.self;
        return request({
            url: `https://api-v2.redbull.tv${collectionLink}`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMTc4LjE5LjIwOS4yMDYiLCJnZW5kZXIiOiJtYWxlIiwib3MiOiJvc194XzEwXzEwX3lvc2VtaXRlIiwib3NfZmFtaWx5Ijoib3NfeCIsIm9mZnNldCI6MCwib3NfdmVyc2lvbiI6IjEwXzEwXzUiLCJzZXNzaW9uX2lkIjoic2Vzc2lvbnM6OjEwNDQwODkwIiwiaHlkcmF0ZSI6ZmFsc2UsImxvY2FsZSI6ImVuIiwidWEiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xMF81KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTAuMC4yNjYxLjEwMiBTYWZhcmkvNTM3LjM2IiwidHlwZSI6InNlc3Npb24iLCJxdWFsaXR5IjpudWxsLCJidWlsZCI6IjQuMC4wIiwibG9jYXRpb24iOnsic3ViZGl2aXNpb24iOm51bGwsImNpdHkiOm51bGwsInRpbWV6b25lIjpudWxsLCJsYXRpdHVkZSI6NTEuMCwiY291bnRyeV9uYW1lIjoiR2VybWFueSIsImxvbmd0aXR1ZGUiOjkuMCwicG9zdGFsX2NvZGUiOm51bGwsInN1YmRpdmlzaW9uX2lzbyI6bnVsbCwiY291bnRyeV9pc28iOiJERSJ9LCJleGNsdWRlIjpudWxsLCJmYW1pbHkiOiJjaHJvbWUiLCJjYXRlZ29yeSI6InBlcnNvbmFsX2NvbXB1dGVyIiwiaWF0IjoxNDY0NDI5ODU3LCJ0aW1lc3RhbXAiOjE0NjQ0Mjk4NTc5NjZ9.H25fl3mNRY1XOYGFodTJDGBsZB8AcSL8a6TVAtZouUY='
            },
            json: true
        });
    }).then(data => data.items[0].title)
}

module.exports = {
    sendTextMessage: sendTextMessage,
    sendImageMessage: sendImageMessage,
    checkIfRedbullFridgePic: checkIfRedbullFridgePic,
    searchForAthletes: searchForAthletes,
    sendPostbackButtonMessage: sendPostbackButtonMessage,
    getNextRBTvShow: getNextRBTvShow
};