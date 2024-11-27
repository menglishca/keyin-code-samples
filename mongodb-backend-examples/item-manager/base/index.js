const mongoose = require('mongoose');
const process = require('process');
const command = process.argv[2];

async function insertItem(itemName) {
}

async function showItems() {
}

async function main() {
    switch (command) {
        case 'insert': {
            const itemName = process.argv[3];
            if (!itemName) {
                console.log('Usage: node index.js insert <item_name>');
                break;
            }
            await insertItem(itemName);
            break;
        }

        case 'show': {
            await showItems();
            break;
        }

        default:
            console.log('Usage: node index.js <command> [arguments]');
            console.log('Commands: insert, show');
    }
    mongoose.connection.close();
}

main().catch((error) => {
    console.error(error);
    mongoose.connection.close();
});
