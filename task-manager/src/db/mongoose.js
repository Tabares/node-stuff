const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('Email is invalid');
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Age must be a positive number');
//       }
//     },
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength: 7,
//     validate(value) {
//       if (value.length <= 6) {
//         throw new Error('The length of password must be greater thant 6');
//       } else if (value.toLowerCase().includes('password')) {
//         throw new Error('The password is using the word password');
//       }
//     },
//   },
// });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// // const me = new User({
// //     name: 'Jose',
// //     age: 32
// // });

// // const me = new User({
// //   name: '  Gaby   ',
// //   email: 'GABSs@gmail.COM',
// //   password: 'pass@#$#$%$'
// // });

// // me.save().then( res => {
// //     console.log(res);
// //     console.log(me);
// // }).catch( err => {
// //     console.log(err)
// // })

// const my = new Task({
//   // completed: true,
//   description: '   Buy a house  ',
// });

// my.save()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });
