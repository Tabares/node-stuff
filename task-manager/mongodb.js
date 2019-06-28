// CRUD create, read update and delete
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {ObjectID, MongoClient} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp())
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString());
// console.log(id.toHexString().length);


MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect database!!!');
    }

    console.log('Connected correctyle!');
    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({
        description : "Clean the house"
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })


    // db.collection('users').deleteMany({
    //     age: 32
    // }).then(result => {
    //     console.log(result)
    // }).catch(err => {
    //     console.log(err)
    // })
    // Update

    // db.collection('tasks').updateMany(
    //     { completed: false},
    //     { $set: { "completed": true}}
    // ).then(res => {
    //     console.log('Result', res)
    // }).catch(err => {
    //     console.log('Err', err);
    // })
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5cf5aa0ed5316913e4798d2c')
    // }, {
    //     $set: {
    //         name: 'Emmanuel'
    //     }
    // });

    // updatePromise.then((res) =>{
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // });

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5cf5aa0ed5316913e4798d2c')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((res) =>{
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })
    

    // Read
    // db.collection('users').findOne({
    //     name: 'Alonso',
    //     age: 2
    // }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch data');
    //     }
    //     console.log(user);
    // });

    // db.collection('users').findOne({
    //     _id : new ObjectID("5cf5ad2a515d0d1b5014896e")
    // }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch data');
    //     }
    //     console.log(user);
    // });

    // db.collection('users').find({
    //     age: 1
    // }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('Unable to fetch data');
    //     }
    //     console.log(users);

    // });

    // db.collection('users').find({
    //     age: 1
    // }).count((error, count) => {
    //     if (error) {
    //         return console.log('Unable to fetch data');
    //     }
    //     console.log(count);

    // });

    // db.collection('tasks').findOne({
    //     _id: new ObjectID('5cf5af8a5b630e4d2c84e18e')
    // }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch data');
    //     }
    //     console.log(task);
    // });

    // db.collection('tasks').find({
    //     completed: false
    // }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('Unable to fetch data');
    //     }
    //     console.log(tasks);

    // });

    // // Create
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Alonso',
    //     age: 1
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);

    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Santiago',
    //         age: 1
    //     },
    //     {
    //         name: 'Gaby',
    //         age: 27

    //     }
    // ], (error, result) => {
    //     if ( error ) {
    //         return console.log('Unable to create');
    //     }
    //     console.log(result.ops);

    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Buy milk',
    //         completed: true
    //     },
    //     {
    //         description: 'Completed node course',
    //         completed: false
    //     }, 
    //     {
    //         description: 'Clean the house',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to create the tasks');
    //     }
    //     console.log(result.ops);
    // })
})