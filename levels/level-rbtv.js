const getNextRBTvShow = require('../utils').getNextRBTvShow;
const sendTextMessage = require('../utils').sendTextMessage;

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'What is the next upcoming Show on redbull.tv');
    },
    answer: (sender, event) => {
        return getNextRBTvShow().then(showTitle => showTitle === event.message.text);
    }
};