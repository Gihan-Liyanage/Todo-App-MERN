const express = require("express");
const Joi = require("joi");
const { Todo } = require("../models/todo");
const auth = require("../middleware/authorize");

const todoRouter = express.Router();

/**
 * Returns all todos corresponding to a particular user
 */
todoRouter.get("/", auth, async (req, res) => {
  try {
    const todolist = await Todo.find({ uid: req.user._id });
    res.send(todolist);
    console.log(req.user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Create a new todo
 */
todoRouter.post("/", auth, (req, res) => {
  /**
   * Data Validation using Joi.
   * Joi is a schema description language and data validator for JavaScript.
   */
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isCompleted: Joi.boolean(),
    uid: Joi.string(),
    date: Joi.date()
  });

  // Getting the error object from validation
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { title, description, isCompleted } = req.body;
  let todo = new Todo({
    title,
    description,
    isCompleted,
    uid: req.user._id
  });

  todo
    .save()
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send(err.message));
});

/**
 * Deletes the todo with given Id
 */
todoRouter.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send("Todo is not found!");

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.send(deletedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Updating the todo. (replacing the existing todo object with the new one)
 */
todoRouter.put("/:id", auth, async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isCompleted: Joi.boolean(),
    uid: Joi.string(),
    date: Joi.date()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send("Todo is not found!");

    const { title, description, isCompleted, uid, date } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        isCompleted,
        uid: req.user._id,
        date
      },
      { new: true }
    );

    res.send(updatedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Change the status of the Todo (isCompleted)
 */

todoRouter.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send("Todo is not found!");

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        isCompleted: !todo.isCompleted
      },
      { new: true }
    );

    res.send(updatedTodo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = todoRouter;
