function verifyAuthorization() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  }
  function verifyAdmin(email, password) {
    var registeredUsers = JSON.parse(localStorage.getItem("userData"));
    if (registeredUsers) {
      var user = registeredUsers.find(
        (user) => user.email === email && user.password === password
      );
  
      if (user && user.isAdmin) {
        return true;
      }
    }
    return false;
  }