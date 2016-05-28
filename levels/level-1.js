const sendTextMessage = require('../utils').sendTextMessage;
const sendImageMessage = require('../utils').sendImageMessage;
const request = require('request-promise');

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'When was RedBull founded');
    },
    answer: (sender, event) => {
        console.log('level 1 answer');
        return Promise.resolve({success: event.message.text === '1987'})
    }
};