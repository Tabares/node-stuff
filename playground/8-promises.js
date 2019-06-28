// const doWorkCallback = (callback) => {
//     setTimeout(
//         () => {
//             // callback('This is my error', undefined)
//             callback(undefined, [1,2,3,5])
//         }, 2000
//     )
// }

// doWorkCallback((error, result) => {
//     if (error) {
//         return console.log(error);
//     }

//     console.log(result);
// });

// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([1, 2, 3, 5]);
//         reject('Thins went wrong');
//     }, 3000);
// });

// doWorkPromise.then((result) => {
//     console.log('Success', result);
// }).catch((err) => {
//     console.log('Error', err)
// })

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(2, 3)
  .then(sum => {
    console.log(sum);
    add(sum, 5)
      .then(sum2 => {
        console.log(sum2);
      })
      .catch(e => {
        console.log(e);
      });
  })
  .catch(e => {
    console.log(e);
  });

add(1, 2)
  .then(sum => {
    console.log(sum);
    return add(sum, 3);
  })
  .then(sum2 => {
    console.log(sum2);
  })
  .catch(e => console.log(e));

add(100, 200)
  .then(sum => add(sum, 300))
  .then(sum => add(sum, 400))
  .then(sum2 => {
    console.log(sum2);
  })
  .catch(e => console.log(e));
