require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')
const _ = require('lodash')
const {authenticate} = require('./middleware/authenticate')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// Public Routes
// POST /todos
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
})

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)){
    return res.status(404).send({})
  }

  Todo.findById(id).then((todo) => {
    if (!todo){
      return res.status(404).send()
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e)
  })
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)){
    return res.status(400).send()
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e)
  })
});

// PATCH /todos/:id
app.patch('/todos/:id', (req,res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)){
    return res.status(400).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// POST /users
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ["email", "password"])
  let user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  })
  .then((token) => {
    res.header("x-auth", token).send(user);
  })
  .catch((e) => {
    res.status(400).send(e);
  });
});

// Private Routes

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = {app};
