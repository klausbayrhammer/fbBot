const levels = require('./levels/levels');
const sendTextMessage = require('./utils').sendTextMessage;

const senderMap = {};

module.exports = (sender, event) => {
    if (!senderMap[sender]) {
        levels[0].question(sender, event);
        senderMap[sender] = {level: 0}
    } else {
        console.log('sendermap', senderMap);
        levels[senderMap[sender].level].answer(sender, event).then(response => {
            console.log('Answer', response);
            if (response.success) {
                senderMap[sender].level = senderMap[sender].level + 1;
                if (senderMap[sender].level === levels.length) {
                    sendTextMessage(sender, 'Great you did it');
                } else {
                    levels[senderMap[sender].level].question(sender, event);
                }
            } else if(!response.skipDefaultMessage) {
                sendTextMessage(sender, 'Sorry wrong answer');
            }
        })
    }

    console.log(senderMap)
};