const sendTextMessage = require('../utils').sendTextMessage;
const checkIfRedbullFridgePic = require('../utils').checkIfRedbullFridgePic;

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'Take a picture of a RedBull fridge');
    },
    answer: (sender, event) => {
        console.log('Checking image', event.message.attachments[0].payload.url);
        return checkIfRedbullFridgePic(event.message.attachments[0].payload.url).then(result => ({success:result}))
    }
};