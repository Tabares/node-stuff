// console.log('js file is loading')

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = search.value;
    const url = `/weather?address=${location}`
    messageOne.textContent = 'The data is loading';
    messageTwo.textContent = '';
    fetch(url).then(res => {
        res.json().then(data => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                const {location, forecast} = data;
                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }
        })
    }).catch(err => {
        console.log('Error: ', err);
    });
});
