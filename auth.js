// REGISTER FUNCTION
function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }

    // ✅ EMAIL FORMAT VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ CHECK EMAIL ALREADY EXISTS
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        alert("Email already registered. Please login.");
        window.location.href = "login.html";
        return;
    }

    const newUser = {
        name,
        email,
        password,
        role: "student"
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
}



// LOGIN FUNCTION
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        alert("Invalid email or password");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful");
    window.location.href = "index.html";
}
