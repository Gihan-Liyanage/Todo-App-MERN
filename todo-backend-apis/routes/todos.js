const { Todo } = require('../models/todo');
const auth = require('../middleware/authorize');
const express = require('express');
const Joi = require('joi');

const todoRouter = express.Router();


/**
 * @swagger
 *  /api/todos:
 *      get: 
 *          summary: Return all todos
 *          response:
 *              '200':
 *              description: Returns all todos (active and completed) related to a specific user
 *          
 */
todoRouter.get('/', auth, async (req, res) => {
    try {
        const todolist = await Todo.find({ uid: req.user._id });
        res.send(todolist);
        console.log(req.user)
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new todo
todoRouter.post('/', auth, (req, res) => {
    /**
     * Data Validation using Joi.
     * Joi is a powerful schema description language and data validator for JavaScript.
     */
    const schema = Joi.object({
        title: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        isCompleted: Joi.boolean(),
        uid: Joi.string(),
        date: Joi.date()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { title, description, isCompleted } = req.body;
    let todo = new Todo({
        title,
        description,
        isCompleted,
        uid: req.user._id,
    })

    todo.save()
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err.message));

})

// Delete todos
todoRouter.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (!todo) return res.status(404).send("Todo is not found!");


        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.send(deletedTodo);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Update todo
todoRouter.put('/:id', auth, async (req, res) => {
    const schema = Joi.object({
        title: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        isCompleted: Joi.boolean(),
        uid: Joi.string(),
        date: Joi.date()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const todo = await Todo.findById(req.params.id)
        if (!todo) return res.status(404).send("Todo is not found!");


        const { title, description, isCompleted, uid, date } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            title,
            description,
            isCompleted,
            uid,
            date
        }, { new: true });

        res.send(updatedTodo);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Change the status of the Todo (isCompleted)
todoRouter.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) return res.status(404).send("Todo is not found!");

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            isCompleted: !todo.isCompleted,
        }, { new: true })

        res.send(updatedTodo);

    } catch (error) {

        res.status(404).send(error.message);
    }
})

module.exports = todoRouter;