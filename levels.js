const sendTextMessage = require('./utils').sendTextMessage;
const sendImageMessage = require('./utils').sendImageMessage;
const request = require('request-promise');

function getAthleteById(athleteId) {
    return request({
        url: `http://api.redbull.com/v2/athletes/${athleteId}/locales/en_int`,
        method: 'GET'
    }).then(function(body) {
        const respObj = JSON.parse(body);
        const athleteObj = respObj.athletes[0];
        return {
            name: athleteObj.name,
            birthdate: athleteObj.birthdate,
            birthplace: athleteObj.birthplace,
            surname: athleteObj.surname,
            firstname: athleteObj.firstname,
            image: athleteObj.fullBodyImage
        };
    })
}

module.exports = [
    {
        question: (sender, event) => {
            getAthleteById("1331578987345").then(data => {
                sendImageMessage(sender, 'Who is this guy', data.image)
            })   
        },
        answer: (sender, event) => {
            if(event.message.text === 'Felix Baumgartner') {
                sendTextMessage(sender, 'Great you did it')
            } else {
                sendTextMessage(sender, 'Sorry wrong answer')
            }
        }
    }
]