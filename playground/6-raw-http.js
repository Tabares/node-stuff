const https = require('https');
const url = 'https://api.darksky.net/forecast/5b6e6292da674a1dde6f2aee3f47092a/37.8267,-122.4233';


const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString();
        console.log(chunk)
    });
    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body)
    });
});

request.on('error', (error) => {
    console.log('An error', error);
})
request.end();