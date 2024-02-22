
    const loginLogoutButton = document.getElementById('loginLogoutButton');

  
    function updateLoginLogoutButton() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginLogoutButton.textContent = 'Logout';
        } else {
            loginLogoutButton.textContent = 'Login';
        }
    }

   
    loginLogoutButton.addEventListener('click', () => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            
            localStorage.setItem('isLoggedIn', 'false');
         
        } else {
           
            localStorage.setItem('isLoggedIn', 'true');
            
        }
        updateLoginLogoutButton();
    });


    updateLoginLogoutButton();

