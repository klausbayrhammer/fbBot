const levels = require('./levels');

const senderMap = {};

module.exports = (sender, event) => {
    var currentSendersLevel = senderMap[sender];
    if (!currentSendersLevel) {
        levels[0].question(sender, event);
        senderMap[sender] = {level: 0}
    } else if (currentSendersLevel === levels.length) {
        sendTextMessage(sender, 'Great you did it');
    } else {
        var currentLevel = senderMap[sender].level;
        if (levels[currentLevel].answer(sender, event)) {
            sendTextMessage(sender, 'Ready for the next level?');
            senderMap[sender].level++;
            levels[senderMap[sender].level].question(sender, event);
        } else {
            sendTextMessage(sender, 'Sorry wrong answer');
        }
    }
};