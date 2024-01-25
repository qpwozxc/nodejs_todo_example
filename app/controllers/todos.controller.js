const Todo = require('../models/todos.model.js');

// Create and Save a new Todo
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    // Create a Todo
    const todo = new Todo({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });

    // Save Todo in the database
    Todo.create(todo, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message || 'Some error occurred while creating the Todo.' });
        else res.send(data);
    });
};

// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
    Todo.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || 'Some error occurred while retrieving todos.' });
        else res.send(data);
    });
};

// Find a single Todo with an id
exports.findOne = (req, res) => {
    Todo.findById(req.params.todoId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                res.status(404).send({ message: `Not found Todo with id ${req.params.todoId}.` });
            else
                res.status(500).send({ message: `Error retrieving Todo with id ${req.params.todoId}.` });
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty!' });
    }

    Todo.updateById(
        req.params.todoId,
        new Todo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found')
                    res.status(404).send({ message: `Not found Todo with id ${req.params.todoId}.` });
                else
                    res.status(500).send({ message: `Error updating Todo with id ${req.params.todoId}.` });
            } else res.send(data);
        }
    );
}

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
    Todo.remove(req.params.todoId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                res.status(404).send({ message: `Not found Todo with id ${req.params.todoId}.` });
            else
                res.status(500).send({ message: `Could not delete Todo with id ${req.params.todoId}.` });
        } else res.send({ message: `Todo was deleted successfully!` });
    });
};