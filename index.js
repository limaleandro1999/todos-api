const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true}).then(() => {
    console.log('Database connected');

    const Todo = mongoose.model(
        'Todo', 
        { 
            text: String,
            done: Boolean 
        }
    );

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        console.log(req.path);
        return next();
    });

    app.get('/todos', async (req, res) => {
        const todos = await Todo.find();

        return res.status(200).json(todos);
    });

    app.post('/todos', async (req, res) => {
        console.log(req.body)
        const todo = await Todo.create(req.body);
        
        return res.status(200).json(todo);
    });

    app.put('/todos/:id', async (req, res) => {
        console.log(req.body)
        const todoId = req.params.id;
        const todo = await Todo.findByIdAndUpdate(todoId, req.body);

        return res.status(200).json(todo);
    });

    app.head('/ping', (req, res) => {
        res.status(200);
    });

    app.listen(3000, '192.168.0.102', () => {
        console.log('Listening on port 3000');
    });
});