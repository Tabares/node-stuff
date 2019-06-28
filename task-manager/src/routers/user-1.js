const express = require('express');
const User = require('../db/models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

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

router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
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
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const user = await User.findByIdAndUpdate(_id, body);
    updates.forEach(field => (user[field] = body[field]));
    await user.save();

    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  const id = req.param.id;
  try {
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(404).send(user);
    }
    res.send(user);
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

module.exports = router;
