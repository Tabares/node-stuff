const express = require('express');
const Task = require('../db/models/task');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', async (req, res) => {
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

router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/tasks/:id', async (req, res) => {
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
    const task = await Task.findByIdAndUpdate(_id);
    updates.forEach(field => (task[field] = body[field]));
    await task.save();
    if (!task) {
      return res.status(404).send({ status: 'Not found' });
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;
