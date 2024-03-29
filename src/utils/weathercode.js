const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7b0282ec8ea80371f418a4030e1c74a2&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' throughout the day. It is currently ' + body.current.temperature + 
            ' degrees with a feels-like temperature of ' + body.current.feelslike + ' degrees' + ' and humidity at ' + body.current.humidity + '%.')
        }
    })
}


module.exports = forecast