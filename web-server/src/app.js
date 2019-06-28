const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../template/partials');
// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));
// setub static directory
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emmanuel Tabares'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Emmanuel Tabares'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Emmanuel Tabares',
        message: 'If you one want to know the weather, please type your location'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an Address'
        })
    }
    const address = req.query.address;
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            // return console.log(error);
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            console.log(location)
            console.log(forecastData);
            res.send({
                forecast: forecastData,
                location: location,
                address
            });
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    } 
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('*', (req, res) => {
    //res.send('My 404 page');
    res.render( '404', {
        title: '404',
        name: 'Emmanuel Tabares',
        error: 'Page is not found'
    })
});

app.listen(  process.env.PORT || port, () => {
    // console.log(`Server is up on port ${port}.`);
    console.log('Server')
})
