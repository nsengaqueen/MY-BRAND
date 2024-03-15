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
    document.getElementById("name-error").textContent = "";
}
function displayErrorMessage(id, message) {
    var errorMessageElement = document.getElementById(id);
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = "red";
}



async function saveusers() {
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    resetErrorMessages();
    var isValid = true;
    var user = {
        fullName:fullName.trim(),
        email: email.trim(),
        password: password.trim(),
       
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
    else if (user.password.length <= 8) {
        displayErrorMessage("password-error", "Password must be atleast 8 characters");
        isValid = false;
    }
    if (!user.fullName) {
        displayErrorMessage("name-error", "Your name is required");
        isValid = false;
    }
    if (isValid) {
        try {
         
    
            const response = await fetch(
              "https://my-brand-backend-1-g6ra.onrender.com/api/users/signup",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              }
            );
    
            if (response.ok) {
                alert("You have registered successfully!");
             window.location.href = "../others.html/login.html";
              document.getElementById("fullName").value = "";
              document.getElementById("email").value = "";
              document.getElementById("password").value = "";
              resetErrorMessage("submit-error");

            } 
             else {
              throw new Error("Failed to to signup");
            }
          } catch (error) {
            console.error("Error:", error.message);
          
          }
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
