
const request = require('request')

const geocode = (address, callback) => {
        const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWxraXNtaXNrIiwiYSI6ImNrZTRkc3B0bzA4NHUyeHJ6bmoyNXIzb3gifQ.3sYeOewfurPYcaFdCXgkjg&limit=1'
     //   console.log(url)
    request({ url, json:true }, (error, {body}) => {
        if(error) {
            callback("There is no connection to the api", undefined)
        } 
        else if (body.features.length === 0) {
            callback("Did not find the location. Please do another search", undefined)
            
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    }

    module.exports = geocode 