const sendTextMessage = require('./utils').sendTextMessage;
const sendImageMessage = require('./utils').sendImageMessage;
const request = require('request-promise');

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'When was RedBull founded');
    },
    answer: (sender, event) => event.message.text === '1987'
};