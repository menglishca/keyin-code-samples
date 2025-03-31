const express = require("express");
const path = require("path");
const app = express();

const messages = [
  { name: "Alice", text: "Hello, world!" },
  { name: "Bob", text: "Express is cooler." }
];

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/messages", (request, response) => {
  response.json(messages);
});

app.post("/api/messages", (request, response) => {
  const { name, text } = request.body;
  const newMessage = { name, text };
  messages.push(newMessage);
  response.status(201).json(newMessage);
});

app.get("/admin", (request, response) => {
  response.render("admin", { messages });
});

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
