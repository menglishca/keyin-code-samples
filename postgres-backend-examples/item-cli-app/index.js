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
 * Creates the database table, if it does not already exist.
 */
async function createTable() {
  const query = `
        CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
        );
    `;
  try {
    await pool.query(query);
    console.log('Table created or already exists');
  }
  catch (error) {
    console.error('Error creating table:', error.stack);
  }
};

/**
 * Inserts a new item into the table
 * 
 * @param {string} itemName Name of the item being added
 */
async function insertItem(itemName) {
  const query = {
    text: 'INSERT INTO items (name) VALUES ($1)',
    values: [itemName],
  };
  try {
    await pool.query(query);
    console.log(`Inserted item: ${itemName}`);
  }
  catch (error) {
    console.error('Error inserting item:', error.stack);
  }
};

/**
 * Prints all items in the database to the console
 */
async function displayItems() {
  const query = 'SELECT * FROM items';
  try {
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      console.log('Items in the table:');
    }
    else {
      console.log('No items in the table');
    }

    result.rows.forEach((row) => {
      console.log(`${row.id}: ${row.name}`);
    });
  }
  catch (error) {
    console.error('Error fetching items:', error.stack);
  }
};

async function deleteAllItems() {
  const query = "DELETE FROM items";
  try {
    await pool.query(query);
    console.log("Deleted all items");
  }
  catch (error) {
    console.error("Error occured while deleting all items");
  }
}

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log('Usage:');
  console.log('  insert <item_name> - Insert an item');
  console.log('  show - Show all items');
  console.log('  delete - Delete all items')
}

/**
 * Runs our CLI app to manage the items database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case 'insert':
      if (!args[1]) {
        printHelp();
        return;
      }

      await insertItem(args[1]);
      break;
    case 'delete':
      await deleteAllItems();
      break;
    case 'show':
      await displayItems();
      break;
    default:
      printHelp();
      break;
  }

  // Close the pool when done
  pool.end();
};

runCLI();
