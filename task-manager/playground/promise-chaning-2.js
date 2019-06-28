require('../src/db/mongoose');
const Task = require('../src/db/models/task');

Task.findByIdAndDelete('5cf81c6b6c9d5b5ce00b42f1')
  .then(res => {
    console.log(res);
    return Task.countDocuments({ completed: false });
  })
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });

const getCountTaskAndDelete = async (id, condition) => {
  const deletedDocument = Task.findByIdAndDelete(id);
  const count = Task.countDocuments(condition);
  return count;
};

getCountTaskAndDelete('5cf81c6b6c9d5b5ce00b42f1', { completed: false })
  .then(res => {
    console.log(res);
  })
  .catch(e => console.log(e));
