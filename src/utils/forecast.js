const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/17e444b043d8a6641e0699c56c5d2b8e/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather services', undefined)
        } else if (body.error) {
            callback('Unable to find the location, Try another location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is curently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance(s) of rain'
                //     {
                //     summary: response.body.daily.data[0].summary,
                //     temperature :  response.body.currently.temperature,
                //     chancesOfRain : response.body.currently.precipProbability              
                // }
            )
        }
    })
}

module.exports = forecast