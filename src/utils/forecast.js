const request = require('request')


const forecast = (x, y, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=882e2e925f7fa16b03366336b92d480f&query='+x+','+y 

    request({ url, json:true }, (error, {body}) => {
        if(error) {
            callback("There is no connection to the api", undefined)
        } 
        else if (body.success === false) {
            callback("Did not find the location. Please do another search", undefined)
        }
        else {
            callback(undefined, {
                forecast: body.current.temperature
            })
        }
    })
    }

module.exports = forecast