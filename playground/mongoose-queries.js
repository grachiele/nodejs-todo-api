const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5af3af1fbc4ae17c28b6058611';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("Todos: ", todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("Todo: ", todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("ID not found")
//   }
//   console.log("Todo by ID: ", todo)
// }).catch((e) => console.log(e))

// var id = '5af3682eba2e036a9242c963'
//
// User.findById(id).then((user) => {
//   if (!user) {
//     return console.log("ID not found")
//   }
//   console.log("User by ID: ", user)
// }, (e) => console.log(e))
