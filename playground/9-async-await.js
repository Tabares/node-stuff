const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('The values must be positive');
      }
      resolve(a + b);
    }, 2000);
  });
};

// const doWork = async () => {
//   throw new Error('This is an error');
//   return 'Jose';
// };

const doWork = async () => {
  const sum = await add(3, 30);
  const sum2 = await add(sum, 100);
  const sum3 = await add(sum2, 1000);
  const sum4 = await add(sum3, -1000);

  return sum3;
};

console.log(doWork());
doWork()
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log('Error: ', e);
  });
