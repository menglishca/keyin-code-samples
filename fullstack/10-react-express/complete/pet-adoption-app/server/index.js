const express = require("express");
const path = require("path");
const app = express();

const pets = [
  { id: 1, name: "Luna", type: "Dog", age: 3 },
  { id: 2, name: "Milo", type: "Cat", age: 2 }
];

let nextId = 3;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/api/pets", (req, res) => {
  res.json(pets);
});

app.post("/api/pets", (req, res) => {
  const { name, type, age } = req.body;
  const newPet = { id: nextId++, name, type, age: Number(age) };
  pets.push(newPet);
  res.status(201).json(newPet);
});

app.get("/admin", (req, res) => {
  res.render("admin", { pets });
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
