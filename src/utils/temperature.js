const request = require('request')

const temperature = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=882e2e925f7fa16b03366336b92d480f&query='+address 

    request({ url: url, json:true }, (error, response) => {
        if(error) {
            callback("There is no connection to the api", undefined)
        } 
        else if (response.body.success === false) {
            callback("Did not find the location. Please do another search", undefined)
        }
        else {
            callback(undefined, response.body.current.temperature)
        }
    })
    }

    module.exports = temperature