const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.PORT || 3000;

// const multer = require('multer');
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('Please upload a Word Document'));
//     }
//     // if (!file.originalname.endsWith('.pdf')) {
//     //   return cb(new Error('Please upload a PDF'));
//     // }

//     cb(undefined, true);
//     // cb(new Error('File must be PDF'))
//     // cb(undefined, true)
//     // cb(undefined, false)
//   },
// });

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send();
// });

// const errorMiddleware = (req, res, next) => {
//   throw new Error('From my middleware');
// };

// app.post(
//   '/upload2',
//   errorMiddleware,
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   },
// );
// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disable');
//   } else {
//     next();
//   }
//   // console.log(req.method, req.path);
//   // next();
// });

// app.use((req, res, next) => {
//   res.status(503).send('All the requests are under maintenance');
//   // next();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Service runnign on ', port);
});

const Task = require('./db/models/task');
const User = require('./db/models/user');

const main = async () => {
  // const task = await Task.findById('5d02cb25cfb83f24c87f1a16');
  // await task.populate('owner').execPopulate();
  // console.log(task.owner);
  // console.log(task);
  // // const user = await User
  const user = await User.findById('5d02ca8ecfb83f24c87f1a13');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
};

main();
// const pet = {
//   name: 'Bart',
// };

// pet.toJSON = function() {
//   console.log(this);
//   return {};
// };
// console.log(JSON.stringify(pet));

// const jwt = require('jsonwebtoken');

// const encrypting = async () => {
//   const token = jwt.sign({ _id: 'sadsadd#$@#4' }, 'thisismycourse', {
//     expiresIn: '7 days',
//   });
//   console.log(token);

//   const data = jwt.verify(token, 'thisismycourse');
//   console.log(data);
// };

// encrypting();
// const router = new express.Router();
// router.get('/test', (req, res) => {
//   res.send('this wdfjkjik');
// });

// const bcrypt = require('bcryptjs');
// const encrypting = async () => {
//   const password = '@#$@$344retR';
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashedPassword);
//   const isMatch = await bcrypt.compare('@#$@$344retR', hashedPassword);
//   console.log(isMatch);
// };

// encrypting();
