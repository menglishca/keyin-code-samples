const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const currentTasks = ["Buy Groceries"];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/todos', (request, response) => {
    const newTodo = request.body.todo;
    if (newTodo) {
        currentTasks.push(newTodo);
    }
    response.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
