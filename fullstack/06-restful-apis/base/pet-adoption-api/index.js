const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

let pets = [
    { id: 1, name: 'Buddy', species: 'Dog', age: 3, adopted: false },
    { id: 2, name: 'Mittens', species: 'Cat', age: 2, adopted: true },
    { id: 3, name: 'Goldie', species: 'Fish', age: 1, adopted: false },
    { id: 4, name: 'Snowball', species: 'Rabbit', age: 4, adopted: false },
    { id: 5, name: 'Luna', species: 'Cat', age: 3, adopted: true }
];

let adopters = [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', adoptedPets: [2] },
    { id: 2, name: 'John Smith', email: 'john@example.com', adoptedPets: [5] }
];

// GET /pets
// Retrieve all pets. Allows filtering by species using a query parameter.
app.get('/pets', (request, response) => {
    response.json(pets);
});

// GET /pets/:id
// Retrieve a specific pet's details by its ID.
app.get('/pets/:id', (request, response) => {

});

// POST /pets
// Adds a new pet to the adoption list. Requires name, species, and age in the request body.
app.post('/pets', (request, response) => {

});

// PUT /pets/:id/adopt
// Marks a pet as adopted by its ID.
app.put('/pets/:id/adopt', (request, response) => {

});

// DELETE /pets/:id
// Deletes a pet from the adoption list by its ID.
app.delete('/pets/:id', (request, response) => {

});

// GET /adopters
// Retrieve all adopters registered in the system.
app.get('/adopters', (request, response) => {

});

// POST /adopters
// Adds a new adopter to the system. Requires name and email in the request body.
app.post('/adopters', (request, response) => {

});

// PUT /adopters/:id/adopt/:petId
// Associates a pet with an adopter's record.
app.put('/adopters/:id/adopt/:petId', (request, response) => {

});

// GET /adopters/:id/pets
// Retrieves all pets adopted by a specific adopter based on the adopter's ID
app.get('/adopters/:id/pets', (request, response) => {

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});