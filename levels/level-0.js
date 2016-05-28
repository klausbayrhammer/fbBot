const sendTextMessage = require('../utils').sendTextMessage;
const sendImageMessage = require('../utils').sendImageMessage;
const searchForAthletes = require('../utils').searchForAthletes;
const sendPostbackButtonMessage = require('../utils').sendPostbackButtonMessage;
const request = require('request-promise');
const _ = require('lodash');

function getAthleteById(athleteId) {
    return request({
        url: `http://api.redbull.com/v2/athletes/${athleteId}/locales/en_int`,
        method: 'GET'
    }).then(function (body) {
        const respObj = JSON.parse(body);
        const athleteObj = respObj.athletes[0];
        return {
            name: athleteObj.name,
            birthdate: athleteObj.birthdate,
            birthplace: athleteObj.birthplace,
            surname: athleteObj.surname,
            firstname: athleteObj.firstname,
            image: athleteObj.fullbodyimage
        };
    })
}

module.exports = {
    question: (sender, event) => {
        getAthleteById("1331578987345").then(data => {
            sendImageMessage(sender, 'Who is this guy', data.image)
        })
    },
    answer: (sender, event) => {
        return new Promise(resolve => {
            if (event.message && event.message.text === 'Felix Baumgartner' || event.postback && event.postback.payload === 'Felix Baumgartner') {
                resolve({success: true})
            }
            if(event.message && event.message.text) {
                return searchForAthletes(event.message.text).then(athletes => {
                    if(!_.isEmpty(athletes)) {
                        sendPostbackButtonMessage(sender, athletes);
                        resolve({success:false, skipDefaultMessage:true})
                    } else {
                        resolve({success:false})
                    }
                })
            } else {
                resolve({success: false});
            }
        });
    }
};