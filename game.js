"use strict";

const levels = require('./levels/levels');
const sendTextMessage = require('./utils').sendTextMessage;
const sendImageMessage = require('./utils').sendImageMessage;

let senderMap = {};

module.exports = (sender, event) => {
    if (event.message && event.message.text && event.message.text.toUpperCase() === 'restart'.toUpperCase()) {
        senderMap = {};
    } else {
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
                            sendImageMessage(sender, 'Use this QR code to fetch you price from the RedBull booth', 'http://s33.postimg.org/3yusjpkin/static_qr_code_without_logo_facebook.jpg')
                        });
                    } else {
                        console.log('Next question');
                        levels[senderMap[sender].level].question(sender, event);
                    }
                } else if (!response.skipDefaultMessage) {
                    sendTextMessage(sender, 'Sorry wrong answer');
                }
            })
        }
    }

    console.log(senderMap)
};