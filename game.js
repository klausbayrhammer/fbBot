const levels = require('./levels');

const senderMap = {};

module.exports = (sender, event) => {
    var currentSendersLevel = senderMap[sender];
    if(!currentSendersLevel) {
        levels[0].question(sender, event);
        senderMap[sender] = {level: 0}
    } else {
        levels[0].answer(sender, event);
    }
};