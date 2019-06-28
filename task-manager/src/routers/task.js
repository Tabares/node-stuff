const express = require('express');
const Task = require('../db/models/task');
const auth = require('../middleware/auth');
const router = express.Router();
// GET: /tasks?limit=3?skip=3
// GET: /tasks?complete=true
// GET: /tasks?sortBY=createAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const values = req.query.sortBy.split(':');
    sort[values[0]] = values[1] === 'desc' ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id });
    // await req.user.populate('tasks').execPopulate();
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
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

router.patch('/tasks/:id', auth, async (req, res) => {
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
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ status: 'Not found' });
    }

    updates.forEach(field => (task[field] = body[field]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.param.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
