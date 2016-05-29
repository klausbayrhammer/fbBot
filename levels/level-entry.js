const sendTextMessage = require('../utils').sendTextMessage;

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'Hi! Are you ready to solve the riddle and get amazing prices?');
    },
    answer: (sender, event) => {
        return Promise.resolve({success: event.message.text === 'Yeah' || event.message.text === 'Yes'})
    }
};