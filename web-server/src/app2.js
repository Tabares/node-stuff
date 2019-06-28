// const path = require('path');
// const express  = require('express');

// // console.log(__dirname);
// // console.log(__filename);
// // console.log(path.join(__dirname, '../public'))

// const app = express();
// const publicDirectoryPath = path.join(__dirname, '../public');
// app.use(express.static(publicDirectoryPath));

// // app.get('', (req, res) => {
// //     res.send('<h1>Weather</h1>');
// // });

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Andrew',
//             age: 27
//         },
//         {
//             name: 'Jose',
//             age: 32
//         },
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>This is an about page</h1>');
// });

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 50,
//         location: 'Philadelphia'
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.');
// });