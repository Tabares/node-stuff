const request = require('request');
// Whater data
const forecast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/5b6e6292da674a1dde6f2aee3f47092a/${lon},${lat}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('The connection is failed', undefined);
        } else if (body.error) {
            callback('The location is failed', undefined);
        } else {
            const data = body;
            const { currently } = data; 
            const { temperature, precipProbability, summary } = currently; 
            callback(
                undefined, 
                `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chances of rain.`
            );
        }
    });
};

module.exports = forecast;