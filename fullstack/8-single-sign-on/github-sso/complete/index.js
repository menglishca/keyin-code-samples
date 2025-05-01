const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const path = require("path");

const app = express();

// Mock user database
const users = [];

// Passport GitHub strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: "Ov23likRSGWGGYsONbPY",
            clientSecret: "15c06fd0d21adbc14d906f5c676bc13e698eb502",
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // Check if user exists, else add them
            let user = users.find((user) => user.id === profile.id);
            if (!user) {
                user = {
                    id: profile.id,
                    username: profile.username,
                    email: profile.emails?.[0]?.value || "No public email",
                    avatar: profile.photos?.[0]?.value || "No photo",
                };
                users.push(user);
            }
            return done(null, user);
        }
    )
);

// Session configuration
app.use(
    session({
        secret: "secret_key",
        resave: false,
        saveUninitialized: false,
    })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user);
});

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

app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (request, response) => {
        response.redirect("/profile");
    }
);

app.get("/logout", (request, response) => {
    request.logout((error) => {
        if (error) {
            return next(error);
        }
        response.redirect("/");
    });
});

// Middleware to protect routes
function ensureAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect("/");
}

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
