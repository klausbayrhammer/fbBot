const levels = require('./levels/levels');
const sendTextMessage = require('./utils').sendTextMessage;

const senderMap = {};

module.exports = (sender, event) => {
    if (!senderMap[sender]) {
        levels[0].question(sender, event);
        senderMap[sender] = {level: 0}
    } else {
        console.log(senderMap);
        levels[senderMap[sender].level].answer(sender, event).then(successfullyDone => {
            console.log('Answer', successfullyDone);
            if (successfullyDone) {
                senderMap[sender].level = senderMap[sender].level + 1;
                if (senderMap[sender].level === levels.length) {
                    sendTextMessage(sender, 'Great you did it');
                } else {
                    levels[senderMap[sender].level].question(sender, event);
                }
            } else {
                sendTextMessage(sender, 'Sorry wrong answer');
            }
        })
    }

    console.log(senderMap)
};