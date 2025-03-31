const mongoose = require('mongoose');
const process = require('process');
const command = process.argv[2];

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

mongoose.connect('mongodb://127.0.0.1:27017/itemdb');

async function insertItem(itemName) {
    const item = new Item({ name: itemName });
    await item.save();
    console.log(`Inserted item: "${itemName}"`);
}

async function showItems() {
    const items = await Item.find();
    if (items.length === 0) {
        console.log('No items in the collection.');
    }
    else {
        console.log('Items in the collection:');
        items.forEach((item) => {
            console.log(`${item._id}: "${item.name}"`);
        });
    }
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
