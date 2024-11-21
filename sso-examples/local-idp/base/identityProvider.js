const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const USERS = [
    { id: 1, username: "IdPUser123", email: "testuser456@example.com", password: "idpPass123" },
    { id: 2, username: "IdPSpecial456", email: "sampleuser789@example.com", password: "idpPass456" },
    { id: 3, username: "IdPNew1", email: "idpnew1@example.com", password: "idpPassNew" },
];

// Secret key for signing JWTs
const SECRET = "idp_secret_key";

app.get("/login", (request, response) => {
    response.render("idpLogin", { redirect: request.query.redirect });
});

app.post("/login", (request, response) => {
    const { email, password, redirect } = request.body;

    const user = USERS.find((user) => user.email === email && user.password === password);
    if (!user) {
        return response.render("idpLogin", { errorMessage: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET, {
        expiresIn: "1h",
    });

    response.redirect(`${redirect}?token=${token}`);
});

app.get("/validate", (request, response) => {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) return response.status(401).json({ error: "No token provided" });

    try {
        const decoded = jwt.verify(token, SECRET);
        response.json({ valid: true, user: decoded });
    }
    catch (err) {
        response.status(401).json({ error: "Invalid token" });
    }
});

// Start IdP server
const PORT = 4000;
app.listen(PORT, () => console.log(`IdP running on http://localhost:${PORT}`));
