const request = require('request');
const url = 'https://api.darksky.net/forecast/5b6e6292da674a1dde6f2aee3f47092a/37.8267,-122.4233';
const geolocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGFiYXJlcyIsImEiOiJjaWhmOXJwdGcwbHJidDRsejhyaW9vNDF1In0.QIxPKKdEcV2RffQP_Ya5lg&limit=1';
const log = console.log;

// Whater data
request({ url: url, json: true }, (error, response) => {
    if (error) {
        log('The connection is failed');
    } else if (response.body.error) {
        log('The location is failed');
    } else {
        const data = response.body;
        const { currently } = data; 
        const { temperature, precipProbability } = currently; 
        // log(data.currently);
        log(`It is currently ${temperature} degrees out. There is a ${precipProbability}% chances of rain.`);
    }
});
// Geolocion
// Address, Lat, ln
request({ url: geolocation, json: true }, (error, response) => {
    // log(response.body.features[0].center);
    if (error) {
        log('The connection is failed')
    } else if (response.body.features.length) {
        log('The location is not found')
    } else {
        const data = response.body;
        const [ln, lat] = data.features[0].center;
        log(`Latitud: ${ln}`)
        log(`Longitud: ${lat}`)
    }
    
   // log(`It is currently ${temperature} degrees out. There is a ${precipProbability}% chances of rain.`)
});
// request({ url: url }, (error, response) => {
//     const data = JSON.parse(response.body);
//     log(data.currently);
// });


// log('Starting');
// setTimeout(() => {
//     log('2 second Timer');
// }, 2000);
// setTimeout(() => {
//     log('0 second Timer');
// }, 0);
// log('Stopped');