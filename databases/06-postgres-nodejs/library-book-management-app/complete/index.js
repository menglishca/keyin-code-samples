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
  const query = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      checked_out BOOLEAN DEFAULT FALSE
    );
  `;
  await pool.query(query);
}

/**
 * Adds a new book to the library
 * 
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book's name
 */
async function addBook(title, author) {
  const query = 'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *';
  const result = await pool.query(query, [title, author]);
  console.log(`Added book: ${result.rows[0].title} by ${result.rows[0].author}`);
}

/**
 * List out all books in the library (both checked and not checked out)
 */
async function showBooks() {
  const result = await pool.query('SELECT * FROM books');
  console.log('Library Books:');
  result.rows.forEach(book => {
    const status = book.checked_out ? '[Checked out]' : '[Available]';
    console.log(`${book.id}: ${book.title} by ${book.author} ${status}`);
  });
}

/**
 * Update a given book's author or title
 * 
 * @param {number} id - The ID of the book to update
 * @param {string} field - The field to update (author or title)
 * @param {string} newValue - The new value of the field
 */
async function updateBook(id, field, newValue) {
  const query = `UPDATE books SET ${field} = $1 WHERE id = $2 RETURNING *`;
  const result = await pool.query(query, [newValue, id]);
  console.log(`Updated book ${id}: ${field.charAt(0).toUpperCase() + field.slice(1)} changed to "${result.rows[0][field]}"`);
}

/**
 * Check out a book from the library
 * 
 * @param {number} id - The ID of the book to checkout
 */
async function checkoutBook(id) {
  const query = 'UPDATE books SET checked_out = TRUE WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  console.log(`Marked book ${id} as checked out.`);
}

/**
 * Remove a book from the library
 * 
 * @param {number} id - The ID of the book to remove
 */
async function deleteBook(id) {
  const query = 'DELETE FROM books WHERE id = $1';
  await pool.query(query, [id]);
  console.log(`Deleted book ${id} from the collection.`);
}

/**
 * Print out all books currently available to be checked out from the library
 */
async function availableBooks() {
  const result = await pool.query('SELECT * FROM books WHERE checked_out = FALSE');
  console.log('Available Books:');
  result.rows.forEach(book => {
    console.log(`${book.id}: ${book.title} by ${book.author}`);
  });
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
