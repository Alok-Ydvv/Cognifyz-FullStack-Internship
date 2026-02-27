const form = document.getElementById("registerForm");
const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength");

const registerPage = document.getElementById("registerPage");
const dashboardPage = document.getElementById("dashboardPage");

passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    const strongRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (value.length < 6) {
        strengthText.textContent = "Weak Password";
        strengthText.style.color = "red";
    } else if (!strongRegex.test(value)) {
        strengthText.textContent = "Medium Password (Add capital, number & symbol)";
        strengthText.style.color = "orange";
    } else {
        strengthText.textContent = "Strong Password";
        strengthText.style.color = "green";
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = passwordInput.value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmError").textContent = "";

    if (name === "") {
        document.getElementById("nameError").textContent = "Name is required";
        valid = false;
    }

    if (!email.includes("@")) {
        document.getElementById("emailError").textContent = "Invalid email";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
        valid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmError").textContent = "Passwords do not match";
        valid = false;
    }

    if (valid) {
        document.getElementById("welcomeUser").textContent = 
            `Hello ${name}, your registration was successful!`;

        registerPage.style.display = "none";
        dashboardPage.style.display = "block";
    }
});

function goBack() {
    dashboardPage.style.display = "none";
    registerPage.style.display = "block";
    form.reset();
    strengthText.textContent = "";
}