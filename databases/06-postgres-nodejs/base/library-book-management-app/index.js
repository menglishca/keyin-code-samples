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
 * Create the books table if it does not already exist
 */
async function createTable() {
}

/**
 * Adds a new book to the library
 * 
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book's name
 */
async function addBook(title, author) {
}

/**
 * List out all books in the library (both checked and not checked out)
 */
async function showBooks() {
}

/**
 * Update a given book's author or title
 * 
 * @param {number} id - The ID of the book to update
 * @param {string} field - The field to update (author or title)
 * @param {string} newValue - The new value of the field
 */
async function updateBook(id, field, newValue) {
}

/**
 * Check out a book from the library
 * 
 * @param {number} id - The ID of the book to checkout
 */
async function checkoutBook(id) {
}

/**
 * Remove a book from the library
 * 
 * @param {number} id - The ID of the book to remove
 */
async function deleteBook(id) {
}

/**
 * Print out all books currently available to be checked out from the library
 */
async function availableBooks() {
}

/**
 * Runs the CLI app to interact with the library
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      const [title, author] = args.slice(1);
      await addBook(title, author);
      break;
    case 'show':
      await showBooks();
      break;
    case 'update':
      const [id, field, newValue] = args.slice(1);
      if (field === 'title' || field === 'author') {
        await updateBook(id, field, newValue);
      }
      else {
        console.log('Invalid field. Only "title" or "author" can be updated.');
      }
      break;
    case 'checkout':
      const checkoutId = args[1];
      await checkoutBook(checkoutId);
      break;
    case 'delete':
      const deleteId = args[1];
      await deleteBook(deleteId);
      break;
    case 'available':
      await availableBooks();
      break;
    default:
      console.log('Invalid command. Available commands: add, show, update, checkout, delete, available.');
  }

  await pool.end();
}

runCLI()
  .catch((error) => {
    console.error('Error executing query', error.stack);
    return pool.end();
  });