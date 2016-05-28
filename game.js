const levels = require('./levels/levels');
const sendTextMessage = require('./utils').sendTextMessage;

const senderMap = {};

module.exports = (sender, event) => {
    if (!senderMap[sender]) {
        levels[0].question(sender, event);
        senderMap[sender] = {level: 0}
    } else if (senderMap[sender].level === levels.length-1) {
        sendTextMessage(sender, 'Great you did it');
    } else {
        var currentLevel = senderMap[sender].level;
        levels[currentLevel].answer(sender, event).then(successfullyDone => {
            if (successfullyDone) {
                senderMap[sender].level = currentLevel+1;
                levels[senderMap[sender].level].question(sender, event);
            } else {
                sendTextMessage(sender, 'Sorry wrong answer');
            }
        })
    }
    console.log(senderMap)
};