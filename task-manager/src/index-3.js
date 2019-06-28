const express = require('express');
require('./db/mongoose');
const User = require('./db/models/user');
const Task = require('./db/models/task');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/users/:id', async (req, res) => {
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

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const users = await user.save();
    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  const updates = Object.keys(body);
  const allowedUpdate = ['description', 'completed'];
  const isValidOperation = updates.every(update =>
    allowedUpdate.includes(update),
  );

  if (!isValidOperation) {
    res.status(400).send({ Error: 'The field is missing in the model' });
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send({ status: 'Not found' });
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdate = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update =>
    allowedUpdate.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/users/:id', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
  const id = req.param.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log('Service runnign on ', port);
});
