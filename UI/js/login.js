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
    else if (password.length <= 8) {
        displayErrorMessage("password-error", "Password must be atleast 8 characters");
        isValid = false;
    }
    if (isValid) {
        fetch("https://my-brand-backend-1-g6ra.onrender.com/api/users/login", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, /",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password})
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else if (response.status === 400) {
                throw new Error('"email" must be a valid email');
              } else {
                throw new Error("Failed to Login");
              }
            })
            .then((data) => {
              if (data.token) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", data.token);
                
                if (data.UserRole === "user") {
                  localStorage.setItem("userRole", "user");
                  window.location.href = "/UI/index.html";
                } else {
                  localStorage.setItem("userRole", "admin");
                  window.location.href = "../Admin/dashboard.html";
                }
              } else {
                displayErrorMessage(
                  "loginError",
                  "Invalid email or password. Please try again."
                );
              }
            })
            .catch((error) => {
              console.error("Error:", error.message);
              if (error.message === '"email" must be a valid email') {
                displayErrorMessage("email-error", "Please enter a valid email address");
              } else {
                displayErrorMessage(
                  "loginError",
                  "Invalid email or password. Please try again."
                );
              }
            })

     
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
