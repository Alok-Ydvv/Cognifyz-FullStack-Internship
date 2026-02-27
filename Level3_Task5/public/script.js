const apiUrl = "/api/students";

let editId = null;

async function fetchStudents() {
    const res = await fetch(apiUrl);
    const students = await res.json();

    const list = document.getElementById("studentList");
    const emptyMessage = document.getElementById("emptyMessage");

    list.innerHTML = "";

    if (students.length === 0) {
        emptyMessage.textContent = "No students added yet.";
        return;
    } else {
        emptyMessage.textContent = "";
    }

    students.forEach(student => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = student.name;

        const buttonGroup = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-warning me-2";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => startEdit(student);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteStudent(student.id);

        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(nameSpan);
        li.appendChild(buttonGroup);

        list.appendChild(li);
    });
}

async function addStudent() {
    const nameInput = document.getElementById("studentName");
    const name = nameInput.value.trim();

    if (!name) return;

    if (editId) {
        await fetch(`${apiUrl}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });

        editId = null;
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
    }

    nameInput.value = "";
    fetchStudents();
}

function startEdit(student) {
    document.getElementById("studentName").value = student.name;
    editId = student.id;
}

async function deleteStudent(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    fetchStudents();
}

fetchStudents();