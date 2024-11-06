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
    const species = request.query.species;
    let result = pets;

    if (species) {
        result = pets.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
    }

    response.json(result);
});

// GET /pets/:id
// Retrieve a specific pet's details by its ID.
app.get('/pets/:id', (request, response) => {
    const petId = parseInt(request.params.id);
    const pet = pets.find((pet) => pet.id === petId);

    if (!pet) {
        return response.status(404).json({ message: 'Pet not found' });
    }

    response.json(pet);
});

// POST /pets
// Adds a new pet to the adoption list. Requires name, species, and age in the request body.
app.post('/pets', (request, response) => {
    const { name, species, age } = request.body;

    if (!name || !species || age == null) {
        return response.status(400).json({ message: 'Name, species, and age are required' });
    }

    const newPet = {
        id: pets.length + 1,
        name,
        species,
        age,
        adopted: false
    };

    pets.push(newPet);
    response.status(201).json(newPet);
});

// PUT /pets/:id/adopt
// Marks a pet as adopted by its ID.
app.put('/pets/:id/adopt', (request, response) => {
    const petId = parseInt(request.params.id);
    const pet = pets.find((pet) => pet.id === petId);

    if (!pet) {
        return response.status(404).json({ message: 'Pet not found' });
    }

    pet.adopted = true;
    response.json(pet);
});

// DELETE /pets/:id
// Deletes a pet from the adoption list by its ID.
app.delete('/pets/:id', (request, response) => {
    const petId = parseInt(request.params.id);
    const petIndex = pets.findIndex((pet) => pet.id === petId);

    if (petIndex === -1) {
        return response.status(404).json({ message: 'Pet not found' });
    }

    pets.splice(petIndex, 1);
    response.status(204).send();
});

// GET /adopters
// Retrieve all adopters registered in the system.
app.get('/adopters', (request, response) => {
    response.json(adopters);
});

// POST /adopters
// Adds a new adopter to the system. Requires name and email in the request body.
app.post('/adopters', (request, response) => {
    const { name, email } = request.body;

    if (!name || !email) {
        return response.status(400).json({ message: 'Name and email are required' });
    }

    const newAdopter = {
        id: adopters.length + 1,
        name,
        email,
        adoptedPets: []
    };

    adopters.push(newAdopter);
    response.status(201).json(newAdopter);
});

// PUT /adopters/:id/adopt/:petId
// Associates a pet with an adopter's record.
app.put('/adopters/:id/adopt/:petId', (request, response) => {
    const adopterId = parseInt(request.params.id);
    const petId = parseInt(request.params.petId);

    const adopter = adopters.find((adopter) => adopter.id === adopterId);
    const pet = pets.find((pet) => pet.id === petId);

    if (!adopter || !pet) {
        return response.status(404).json({ message: 'Adopter or pet not found' });
    }

    if (!pet.adopted) {
        pet.adopted = true;
        adopter.adoptedPets.push(petId);
        return response.json(adopter);
    }

    response.status(400).json({ message: 'Pet is already adopted' });
});

// GET /adopters/:id/pets
// Retrieves all pets adopted by a specific adopter based on the adopter's ID
app.get('/adopters/:id/pets', (request, response) => {
    const adopterId = parseInt(request.params.id);
    const adopter = adopters.find(a => a.id === adopterId);
    
    if (!adopter) {
        return response.status(404).json({ message: 'Adopter not found' });
    }

    const adoptedPets = pets.filter(pet => adopter.adoptedPets.includes(pet.id));
    response.json(adoptedPets);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
