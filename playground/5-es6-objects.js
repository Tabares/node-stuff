// Object property shorthand
const name = "Emmanuel";
const userAge = 32;

const user = {
    name,
    age: userAge,
    location: 'Monterrey'
};

console.log(user);
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rate: 33
}

const {label: productLabel, price, rate= 5} = product;
console.log(productLabel);
console.log(price);
console.log(rate);

const transaction = (type, {label, stock = 0} = {}) => {
    console.log(type, label, stock);
}

transaction('order', product);

transaction('order');