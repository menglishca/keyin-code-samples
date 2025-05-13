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

};

/**
 * Adds a new todo list item
 * 
 * @param {string} task - The item to add
 */
async function addTodo(task) {

};

/**
 * Prints all todo list items to the console
 */
async function showTodos() {

};

/**
 * Marks the specified todo list item as completed
 * 
 * @param {number} id - The ID of the todo list item
 */
async function completeTodo(id) {

};

/**
 * Deletes the specified todo list item
 * 
 * @param {number} id - The ID of the todo list item
 */
async function deleteTodo(id) {

};

/**
 * Removes all todo list items that have been completed
 */
async function clearCompleted() {

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