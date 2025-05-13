const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(
    session({
        secret: "super-secret-key", // Replace with a secure secret in production
        resave: false,
        saveUninitialized: false,
    })
);

// Mock database
const USERS = [
    { id: 1, username: "TestUser456", email: "testuser456@example.com", password: "pass456" },
    { id: 2, username: "SampleUser789", email: "sampleuser789@example.com", password: "pass789" },
];

// Routes
app.get("/", (request, response) => {
    response.render("home");
});

app.get("/login", (request, response) => {
    response.render("login");
});

app.post("/login", (request, response) => {
    const { email, password } = request.body;
    const user = USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
        return response.render("login", { errorMessage: "Invalid email or password" });
    }

    request.session.user = user;
    response.redirect('/dashboard');
});

app.get("/dashboard", (request, response) => {
    return response.render("dashboard", { username: request.session.user.username });
});

app.post("/logout", (request, response) => {
    request.session.destroy(() => {
        response.redirect("/");
    });
});

app.get('/signup', (request, response) => {
    
});

app.post("/signup", (request, response) => {
    
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`SP running on http://localhost:${PORT}`));
