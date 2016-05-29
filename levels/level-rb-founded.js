const sendTextMessage = require('../utils').sendTextMessage;
const sendImageMessage = require('../utils').sendImageMessage;
const request = require('request-promise');

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'Ok here we go! When was RedBull founded');
    },
    answer: (sender, event) => {
        return Promise.resolve({success: event.message.text === '1987'})
    }
};