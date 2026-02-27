const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let students = [];

// CREATE
app.post("/api/students", (req, res) => {
    const { name } = req.body;
    const newStudent = { id: Date.now(), name };
    students.push(newStudent);
    res.json(newStudent);
});

// READ
app.get("/api/students", (req, res) => {
    res.json(students);
});

// DELETE
app.delete("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(student => student.id !== id);
    res.json({ message: "Student deleted" });
});

// UPDATE
app.put("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = name;
    res.json(student);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});