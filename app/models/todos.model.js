const sql = require('./db.js');

const Todo = function (todo) {
    this.id = todo.id;
    this.status = todo.status;
    this.title = todo.title;
    this.description = todo.description;
}

Todo.create = (newTodo, result) => {
    sql.query("INSERT INTO TODO SET ?", newTodo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        console.log("created todo: ", { id: res.insertId, ...newTodo });
        result(null, { id: res.insertId, ...newTodo });
    });
}

Todo.findById = (todoId, result) => {
    sql.query(`SELECT * FROM TODO WHERE id = ${todoId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        if (res.length) {
            console.log("found todo: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

Todo.getAll = result => {
    sql.query("SELECT * FROM TODO", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err)
            return;
        }
        console.log("todos: ", res);
        result(null, res);
    });
}

Todo.updateById = (id, todo, result) => {
    sql.query(
        "UPDATE TODO SET title = ?, description = ?, status = ? WHERE id = ?",
        [todo.title, todo.description, todo.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err)
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated todo: ", { id: id, ...todo });
            result(null, { id: id, ...todo });
        }
    );
}

Todo.remove = (id, result) => {
    sql.query("DELETE FROM TODO WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err)
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted todo with id: ", id);
        result(null, res);
    });
}

module.exports = Todo;