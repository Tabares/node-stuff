const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const place = process.argv[2];

if (place) {
    geocode(place, (error, data) => {
        if (error) {
            return console.log(error);
        }
        //console.log('Data', data);
        const { longitude, latitude, location } = data;
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }
            console.log(location)
            console.log(forecastData);
        })
    });

} else {
    console.log('Please provide address')
}



