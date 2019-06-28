const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../db/models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const upload = multer({
  // dest: 'avatar',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(res, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpge|png)$/)) {
      return cb(new Error('A jpg, jpge or png file is required'));
    }
    cb(undefined, true);
  },
});

router.get('/test', (req, res) => {
  res.send('this wdfjkjik');
});

router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const newUser = await User.findById(_id);
    if (!newUser) {
      return res.status(404).send();
    }
    res.send(newUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/users/me', auth, async (req, res) => {
  const _id = req.user._id;
  const body = req.body;
  const updates = Object.keys(req.body);
  const allowedUpdate = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update =>
    allowedUpdate.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    updates.forEach(field => (req.user[field] = body[field]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const users = await user.save();
    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    // req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send({ upload: 'Successul!!' });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  },
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send({ message: 'The image has been deleted' });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user.avatar || !user) {
      throw new Error('Image is not found');
    }
    //res.set('Content-Type', 'image/jpg');
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/users/not', async (req, res) => {
  try {
    const user = await User.findOne({});
    console.log(user);
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
