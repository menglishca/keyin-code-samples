/**
 * Creates the database table, if it does not already exist.
 */
async function createTable() {

};

/**
 * Inserts a new item into the table
 * 
 * @param {string} itemName Name of the item being added
 */
async function insertItem(itemName) {

};

/**
 * Prints all items in the database to the console
 */
async function displayItems() {

};

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log('Usage:');
  console.log('  insert <item_name> - Insert an item');
  console.log('  show - Show all items');
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
    case 'show':
      await displayItems();
      break;
    default:
      printHelp();
      break;
  }
};

runCLI();