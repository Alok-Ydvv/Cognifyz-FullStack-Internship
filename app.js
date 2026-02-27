const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));   // for CSS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const { name, email, age, phone } = req.body;

    res.render("result", { name, email, age, phone });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
