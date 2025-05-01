const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const path = require("path");

const app = express();

// Mock user database
const users = [];

// Session configuration
app.use(
    session({
        secret: "secret_key",
        resave: false,
        saveUninitialized: false,
    })
);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (request, response) => {
    response.render("index", { user: request.user });
});

app.get("/profile", ensureAuthenticated, (request, response) => {
    response.render("profile", { user: request.user });
});

app.get("/logout", (request, response) => {
    request.logout((error) => {
        if (error) {
            return next(error);
        }
        response.redirect("/");
    });
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
