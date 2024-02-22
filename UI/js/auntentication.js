"use strict";
function verifyAuthorization() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
}
function verifyAdmin(email, password) {
    var registeredUsers = JSON.parse(localStorage.getItem("userData"));
    if (registeredUsers) {
        var user = registeredUsers.find((user) => user.email === email && user.password === password);
        if (user && user.trueAdmin) {
            return true;
        }
    }
    return false;
}
function AllowToAccess() {
    window.location.href = "UI/Admin/dashboard.html";
}
function checkAccess() {
    if (!verifyAuthorization() && !verifyAdmin()) {
        AllowToAccess();
    }
}
checkAccess();


function checkAuthentication() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  }
  
  function checkAdmin() {
    var isAdmin = localStorage.getItem("userRole");
    return isAdmin === "admin";
  }
  
  function redirectToLoginPage() {
    window.location.href = "/UI/login.html";
  }
  
  function checkAccessToAdminPage() {
    if (!checkAuthentication() || !checkAdmin()) {
      redirectToLoginPage();
    }
  }
  
  checkAccessToAdminPage();
  