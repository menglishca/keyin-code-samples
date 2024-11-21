const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const axios = require("axios");
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

// Middleware for token extraction
app.use((request, response, next) => {
    if (request.query.token) {
        request.session.token = request.query.token;
    }
    next();
});

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
    const { email, username } = request.query;
    return response.render('signup', {email: email ?? '', username: username ?? ''});
});

app.post("/signup", (request, response) => {
    const { email, username, password } = request.body;

    // Check if user already exists by email
    const existingUser = USERS.find((existingUser) => existingUser.email === email);
    if (existingUser) {
        return response.render("error", { message: "Account with this email already exists." });
    }

    const newUser = { 
        id: USERS.length + 1, // Incremental user id, this could be replaced by a DB auto-increment field
        email, 
        username, 
        password: password
    };

    // Add the new user to the USERS array (simulating database insertion)
    USERS.push(newUser);

    // Log the new user in by saving them to the session
    request.session.user = newUser;
    response.redirect("/dashboard");
});


app.get("/auth/sso", (request, response) => {
    return response.redirect("http://localhost:4000/login?redirect=http://localhost:3000/auth/token");
});

app.get("/signup/sso", (request, response) => {
    return response.redirect("http://localhost:4000/login?redirect=http://localhost:3000/auth/signup");
});

app.get("/auth/token", async (request, response) => {
    if (request.session.user) {
        return response.redirect('/dashboard');
    }

    if (!request.session.token) {
        return response.redirect("/");
    }

    try {
        const idpResponse = await axios.get("http://localhost:4000/validate", {
            headers: { Authorization: `Bearer ${request.session.token}` },
        });

        const idpUser = idpResponse.data.user;
        const user = USERS.find((user) => user.email === idpUser.email);

        if (!user) {
            return response.render("error", { message: "No account found for this email" });
        }

        request.session.user = user;
        return response.redirect('/dashboard');
    }
    catch (err) {
        response.redirect("/");
    }
});

app.get("/auth/signup", async (request, response) => {
    if (!request.session.token) {
        return response.redirect("/");
    }

    try {
        const idpResponse = await axios.get("http://localhost:4000/validate", {
            headers: { Authorization: `Bearer ${request.session.token}` },
        });
        console.log(idpResponse);

        return response.redirect(`/signup?email=${idpResponse.data.user.email}&username=${idpResponse.data.user.username}`);
    }
    catch (err) {
        response.redirect("/");
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`SP running on http://localhost:${PORT}`));
