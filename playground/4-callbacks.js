setTimeout(() => {
    console.log('call back function 2 seconds');
}, 2000);

const names = ['Jose', 'Ricky', 'Joseph'];
const shortNames = names.filter( name => {
    return name.length <= 5;
});

console.log(shortNames);

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitud: 0,
            longitud: 0
        };
        // return data;
        callback(data);
    }, 2000);
}

// const data = geocode('Philadelphia');
// console.log(data);
 geocode('Philadelphia', (data) => {
    console.log(data);
 });

 //
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a, b, callback) => {
    setTimeout(()=> {
        const sum = a + b;
        callback(sum);
    }, 3000);
};

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})
