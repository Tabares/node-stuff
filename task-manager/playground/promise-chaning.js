require('../src/db/mongoose');
const User = require('../src/db/models/user');
// 5cf6ea04ae529e1fd003762f

User.findByIdAndUpdate('5cf6ea04ae529e1fd003762f', { age: 1 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });

const getCountAndUpdate = async (id, age) => {
  const getFoundUser = await User.findByIdAndUpdate(id, { age });
  const getCount = await User.countDocuments({ age });
  return getCount;
};

getCountAndUpdate('5cf6ea04ae529e1fd003762f', 1)
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });
