const request = require('request');


const weather = (lon, lat, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=3ecf54b4fe74cc3c76d710af006a44e4&query=' + lon + ',' + lat + '&unites=m';

    request(weatherURL, { json: true }, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        }
        else {
            callback(undefined, body.current)
        }
    });
}

const geoCode = (addr, callback) => {
    const mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + addr + ".json?access_token=pk.eyJ1IjoibGFib3JjIiwiYSI6ImNrOW1sMGNtbjA1ZDQzZnFoMm4wMTd4OWwifQ.w59P2KVEJZ3LhSE4TRI2wg"

    request(mapboxURL, { json: true }, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        }
        else if (body.features.length === 0) {
            callback("mapping error ", undefined)

        } else {
            callback(undefined, { lon:body.features[0].center[0], lat: body.features[0].center[1] })
        }
    })
}


const getWeatherForLocation = 
(addr,callback) => {
    geoCode(addr, (error, {lon,lat}={}) => {
        if (error) {
            
            return callback("Error during address lookup" + error, undefined)
        }   
        weather(lat, lon, (error, d) => {
            if (error) {
               
                return callback("Error during weather fetch "+error,undefined)
            }
            callback(undefined,d)
        })
    })
}

module.exports = getWeatherForLocation
