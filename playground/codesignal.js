const s = 'foo(bar)baz';
const a = 'foo(bar(baz))blim';
const z = 'foobarbaz';
const l = [50, 60, 60, 45, 70];

const alternatingSums2 = a => {
  return a.reduce(
    (acc, val, index) => {
      if (index % 2 == 0) {
        console.log(val);
        acc = [acc[0] + val, acc[1]];
      } else {
        acc = [acc[0], acc[1] + val];
      }
      return acc;
    },
    [0, 0],
  );
};

const alternatingSums = a =>
  a.reduce(
    (acc, val, index) =>
      (acc = index % 2 == 0 ? [acc[0] + val, acc[1]] : [acc[0], acc[1] + val]),
    [0, 0],
  );

console.log(alternatingSums(l));

// const reverseInParentheses = (inputString) => {
//     // const x = inputString.split('(')[1].split(')')[0];
//     // const y = inputString.split(')');
//     // console.log(x);
//     // //console.log(y)
//     let init = false;
//     let inverse = [];
//     return inputString.split('').reduce((acc, val) => {
//         if (val === '(') {
//             init = true;
//         } else if (init || (val === ')')) {
//             if (!(val === ')')) {
//                 inverse.push(val);
//             } else {
//                 init = false;
//                 const reverse = inverse.reverse();
//                 inverse = [];
//                 acc = [...acc, ...reverse];
//             }
//         } else {
//             acc = [...acc, val];
//         }
//         return acc;
//     }, []).join('');
// }

const reverseStr = str => {
  const center = str.split('(');
  console.log(center);
  return center[center.length - 1]
    .split('')
    .reverse()
    .join('');
};
const reverseInParentheses = inputString => {
  const index = inputString.lastIndexOf('(');
  if (!(index === -1)) {
    const remaining = inputString.substr(0, index);
    const firstParenthese = inputString.substr(index + 1);
    const lastIndex = firstParenthese.indexOf(')');
    const reverse = firstParenthese
      .substr(0, lastIndex)
      .split('')
      .reverse()
      .join('');
    const tail = firstParenthese.substr(lastIndex + 1);
    return reverseInParentheses(remaining + reverse + tail);
  }
  return inputString;
};

//console.log(reverseInParentheses(s));

// "foo (bar(baz)) blim"
// "foo  zabrab  blim"
// "foo  bazrab  blim"
