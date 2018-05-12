const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove("5af5eb2b1415ae23c727f372").then((todo) => {
  console.log(todo)
})
