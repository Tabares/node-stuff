const request = require('request');
// Geolocion
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFiYXJlcyIsImEiOiJjaWhmOXJwdGcwbHJidDRsejhyaW9vNDF1In0.QIxPKKdEcV2RffQP_Ya5lg&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location try with another!', undefined)
        } else {
            const [longitude, latitude] = body.features[0].center;
            const location = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }

    });
};

module.exports = geocode;