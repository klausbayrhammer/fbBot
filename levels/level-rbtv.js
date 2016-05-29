const getNextRBTvShow = require('../utils').getNextRBTvShow;
const sendTextMessage = require('../utils').sendTextMessage;
const levenshtein = require('fast-levenshtein');

module.exports = {
    question: (sender, event) => {
        sendTextMessage(sender, 'What is the next upcoming Show on redbull.tv');
    },
    answer: (sender, event) => {
        return getNextRBTvShow().then(showTitle => ({
            success: levenshtein.get(showTitle.toUpperCase(), event.message.text.toUpperCase()) < 4
        }));
    }
};