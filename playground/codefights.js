


const a = [-1, 150, 190, 170, -1, -1, 160, 180];

const compare = (a, b) => a - b, removeTrees = (x) => x > -1;
const sortByHeight = a => {
    const persons = a.filter(removeTrees).sort(compare);
    return a.reduce((acc, element) => 
        element === -1 ? [...acc, element] : [...acc, persons.shift()], []);
};

// console.table(sortByHeight(a));

const s = '(baz)';

const reverseInParentheses = (inputString)=> {
    const z = inputString.split('').reduce((acc, val) => {
        if (val === '(') {
            acc[1].push(val);
        } else {
            acc[0].push(val);
        }
        return acc;
    }, [[], []]);
    return z;
}


console.log(reverseInParentheses(s))