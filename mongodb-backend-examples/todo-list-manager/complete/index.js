const mongoose = require('mongoose');
const process = require('process');
const command = process.argv[2];

// Define the ToDo Schema
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Create the ToDo Model
const ToDo = mongoose.model('ToDo', todoSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add a new to-do item
async function addToDo(task) {
  const todo = new ToDo({
    task,
    completed: false,
  });
  await todo.save();
  console.log(`Added to-do: "${task}"`);
}

// Show all to-do items
async function showToDos() {
  const todos = await ToDo.find();
  if (todos.length === 0) {
    console.log('No to-do items found.');
  } else {
    console.log('To-do List:');
    todos.forEach((todo) => {
      console.log(`${todo._id} - "${todo.task}" ${todo.completed ? '(Completed)' : '(Pending)'}`);
    });
  }
}

// Mark a to-do item as completed
async function completeToDo(id) {
  const todo = await ToDo.findByIdAndUpdate(id, { completed: true }, { new: true });
  if (todo) {
    console.log(`Marked to-do ${id} as completed: "${todo.task}"`);
  } else {
    console.log(`No to-do found with ID ${id}`);
  }
}

// Delete a to-do item by ID
async function deleteToDo(id) {
  const todo = await ToDo.findByIdAndDelete(id);
  if (todo) {
    console.log(`Deleted to-do: "${todo.task}"`);
  } else {
    console.log(`No to-do found with ID ${id}`);
  }
}

async function main() {
  switch (command) {
    case 'add': {
      const task = process.argv[3];
      if (!task) {
        console.log('Usage: node index.js add <task>');
        break;
      }
      await addToDo(task);
      break;
    }

    case 'show': {
      await showToDos();
      break;
    }

    case 'complete': {
      const id = process.argv[3];
      if (!id) {
        console.log('Usage: node index.js complete <id>');
        break;
      }
      await completeToDo(id);
      break;
    }

    case 'delete': {
      const id = process.argv[3];
      if (!id) {
        console.log('Usage: node index.js delete <id>');
        break;
      }
      await deleteToDo(id);
      break;
    }

    default:
      console.log('Usage: node index.js <command> [arguments]');
      console.log('Commands: add, show, complete, delete');
  }

  mongoose.connection.close();
}

main().catch((error) => {
  console.error(error);
  mongoose.connection.close();
});
