module.exports = app => {
    const todos = require("../controllers/todos.controller.js");

    // Create a new Todo
    app.post("/api/todos", todos.create);

    // Retrieve all Todos
    app.get("/api/todos", todos.findAll);

    // Retrieve a single Todo with todoId
    app.get("/api/todos/:todoId", todos.findOne);

    // Update a Todo with todoId
    app.put("/api/todos/:todoId", todos.update);

    // Delete a Todo with todoId
    app.delete("/api/todos/:todoId", todos.delete);

}