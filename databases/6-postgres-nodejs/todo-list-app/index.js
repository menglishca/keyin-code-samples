const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres', //This _should_ be your username, as it's the default one Postgres uses
  host: 'localhost',
  database: 'keyin_test', //This should be changed to reflect your actual database
  password: 'Keyin123', //This should be changed to reflect the password you used when setting up Postgres
  port: 5432,
});

/**
 * Creates the to do list table, if it does not already exist
 */
async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      task TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    )
  `;
  await pool.query(query);
};

/**
 * Adds a new todo list item
 * 
 * @param {string} task - The item to add
 */
async function addTodo(task) {
  const query = 'INSERT INTO todos (task) VALUES ($1) RETURNING *';
  const response = await pool.query(query, [task]);
  console.log(`Added to-do item: ${response.rows[0].task}`);
};

/**
 * Prints all todo list items to the console
 */
async function showTodos() {
  const query = 'SELECT * FROM todos';
  const response = await pool.query(query);
  if (!response.rows.length) {
    console.log("To-do list is empty");
    return;
  }

  console.log('To-Do List:');
  response.rows.forEach((todo) => {
    console.log(`${todo.id}: ${todo.task} [${todo.completed ? 'Completed' : 'Not completed'}]`);
  });
};

/**
 * Marks the specified todo list item as completed
 * 
 * @param {number} id - The ID of the todo list item
 */
async function completeTodo(id) {
  const query = 'UPDATE todos SET completed = TRUE WHERE id = $1 RETURNING *';
  const response = await pool.query(query, [id]);
  if (response.rowCount > 0) {
    console.log(`Marked item ${id} as completed.`);
  }
  else {
    console.log(`No item found with id ${id}.`);
  }
};

/**
 * Deletes the specified todo list item
 * 
 * @param {number} id - The ID of the todo list item
 */
async function deleteTodo(id) {
  const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
  const response = await pool.query(query, [id]);
  if (response.rowCount > 0) {
    console.log(`Deleted item ${id} from the list.`);
  }
  else {
    console.log(`No item found with id ${id}.`);
  }
};

/**
 * Removes all todo list items that have been completed
 */
async function clearCompleted() {
  const query = 'DELETE FROM todos WHERE completed = TRUE';
  await pool.query(query);
  console.log('Cleared all completed to-do items.');
};

/**
 * Runs our CLI app to manage the todo list
 */
async function runCLI() {
  await createTable();
  const args = process.argv.slice(2);

  switch (args[0]) {
    case 'add':
      const task = args.slice(1).join(' ');
      await addTodo(task);
      break;
    case 'show':
      await showTodos();
      break;
    case 'complete':
      const completeId = parseInt(args[1], 10);
      await completeTodo(completeId);
      break;
    case 'delete':
      const deleteId = parseInt(args[1], 10);
      await deleteTodo(deleteId);
      break;
    case 'clear':
      await clearCompleted();
      break;
    default:
      console.log('Invalid command. Use add, show, complete, delete, or clear.');
  }

  // Close the database connection
  await pool.end();
};

runCLI()
  .catch((error) => {
    console.error('Error executing query', error.stack);
    return pool.end();
  });
