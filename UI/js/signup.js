"use strict";
document.getElementById("submit").addEventListener("click", function () {
    saveusers();
});
function isValidEmail(email) {
    var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
    return emailRegex.test(email);
}
function resetErrorMessages() {
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
}
function displayErrorMessage(id, message) {
    var errorMessageElement = document.getElementById(id);
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = "red";
}
let usersarray = [];
getusers();
function getusers() {
    var users = localStorage.getItem("users");
    if (users) {
        usersarray = JSON.parse(users);
    }
    else {
        setusers();
    }
}
function setusers() {
    localStorage.setItem("users", JSON.stringify(usersarray));
}
function saveusers() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;
    resetErrorMessages();
    var isValid = true;
    var user = {
        email: email.trim(),
        password: password.trim(),
        confirmpassword: confirmpassword.trim(),
        trueAdmin: false
    };
    if (!user.email) {
        displayErrorMessage("email-error", "Please enter your email ");
        isValid = false;
    }
    else if (!isValidEmail(user.email)) {
        displayErrorMessage("email-error", "Please enter a valid email address");
        isValid = false;
    }
    if (!user.password) {
        displayErrorMessage("password-error", "Please enter a password");
        isValid = false;
    }
    else if (user.password.length <= 6) {
        displayErrorMessage("password-error", "Password must be atleast 6 characters");
        isValid = false;
    }
    if (user.password !== user.confirmpassword) {
        displayErrorMessage("confirmpassword-error", "passwords must be the same");
        isValid = false;
    }
    if (isValid) {
        usersarray.push(user);
        setusers();
        window.location.href = "../others.html/login.html";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmpassword").value = "";
        alert("You have registered successfully!");
    }
}
let eyeicon = document.getElementById("eyeicon");
eyeicon.onclick = function () {
    if (password.type == "password") {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
};
