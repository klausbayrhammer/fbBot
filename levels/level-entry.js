const sendTextMessage = require('../utils').sendTextMessage;

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'Hi! Are you ready to take the quiz?');
    },
    answer: (sender, event) => {
        return Promise.resolve({success: event.message.text === ('Yeah')    })
    }
};