const sendPostbackButtonMessage = require('../utils').sendPostbackButtonMessage;

module.exports = {
    question: (sender, event) => {
        sendPostbackButtonMessage(sender, ['Felix Baumgartner', 'Antonio Felix']);
    },
    answer: (sender, event) => {
        console.log(event);
    }
};