const levels = require('./levels/levels');
const sendTextMessage = require('./utils').sendTextMessage;
const sendImageMessage = require('./utils').sendImageMessage;

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
                    console.log('Done');
                    sendTextMessage(sender, 'Holy cow you did it!').then(() => {
                        sendImageMessage(sender, 'Use this QR code to fetch you price from the RedBull booth', 'http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=daawd&qzone=1&margin=0&size=150x150&ecc=L')
                    });
                } else {
                    console.log('Next question');
                    levels[senderMap[sender].level].question(sender, event);
                }
            } else if(!response.skipDefaultMessage) {
                sendTextMessage(sender, 'Sorry wrong answer');
            }
        })
    }

    console.log(senderMap)
};