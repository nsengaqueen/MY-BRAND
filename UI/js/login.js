"use strict";
document.getElementById("submit").addEventListener("click", function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    let eyeicon = document.getElementById("eyeicon");
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    var isValid = true;
    if (!email) {
        displayErrorMessage("email-error", "Please enter your email ");
        isValid = false;
    }
    else if (!isValidEmail(email)) {
        displayErrorMessage("email-error", "Please enter a valid email address");
        isValid = false; document.getElementById('loginError').textContent = "";
  
   
    }
    if (!password) {
        displayErrorMessage("password-error", "Please enter a password");
        isValid = false;
    }
    else if (password.length <= 6) {
        displayErrorMessage("password-error", "Password must be atleast 6 characters");
        isValid = false;
    }
    if (isValid) {
        var truesuser = JSON.parse(localStorage.getItem("users"));
        if (truesuser) {
            var user = truesuser.find((user) => user.email === email && user.password === password);
            if (user) {
            
                
                localStorage.setItem("isLoggedIn", "true");
                // window.location.href = user.trueAdmin
                //      ? "/UI/Admin/dashboard.html"
                //     : "/UI/index.html";
                if (email === "nsengaqueen123@gmail.com" && password === "1234567") {
                    localStorage.setItem("userRole", "admin");
                    window.location.href = "/UI/Admin/dashboard.html";
                  } else {
                    localStorage.setItem("userRole", "user");
                    window.location.href = "/UI/index.html";
                  }
            }
            else {
                displayErrorMessage("loginError", "Unrecognised email or password. Please try again.");
            }
        }
        else {
            displayErrorMessage("loginError", "No registered users found. Please sign up first.");
        }
    }
});
function isValidEmail(email) {
    var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
    return emailRegex.test(email);
}
function resetErrorMessages() {
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById('loginError').textContent = "";
}
function displayErrorMessage(id, message) {
    var errorMessageElement = document.getElementById(id);
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = "red";
}
eyeicon.onclick = function () {
    if (password.type == "password") {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
};
