const express = require("express");
const path = require("path");
const app = express();

// Serve static React files
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "public")));

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
