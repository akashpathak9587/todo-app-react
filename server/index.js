const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// In-memory storage for todos
let todos = [];

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/todos", (req, res) => {
    try {
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
});

app.post("/todos", (req, res) => {
    try {
        const { title, completed } = req.body;
        const newTodo = { id: generateTodoId(), title, completed };
        todos.push(newTodo);
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Error adding todo" });
    }
});

app.delete("/todos/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        todos = todos.filter((todo) => todo.id !== id);
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
});

// Generate unique ID for new todos
function generateTodoId() {
    return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});