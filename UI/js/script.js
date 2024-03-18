
 

  
    function updateLoginLogoutButton() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginLogoutButton.textContent = 'LOGOUT';
        } else {
            loginLogoutButton.textContent = 'LOGIN';
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




    document.getElementById('contactForm').addEventListener('submit', function(event) {
       
        event.preventDefault();
        document.getElementById("email-error").textContent = "";
    document.getElementById("name-error").textContent = "";
    document.getElementById("message-error").textContent = "";
   
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;
      
       
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValidEmail = emailPattern.test(email);
        var isValid = true;
     
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return; 
          }
        if ( !message) {
            displayErrorMessage("message-error", "message can not be empty");
        isValid = false; document.getElementById('submit-error').textContent = ""; 
        }
      
       
        if (!isValidEmail) {
            displayErrorMessage("email-error", "Please enter a valid email address");
            isValid = false; document.getElementById('submit-error').textContent = "";
          
        }
        if ( !name) {
            displayErrorMessage("name-error", "name can not be empty");
        isValid = false; document.getElementById('submit-error').textContent = ""; 
        }
        if (isValid) {
        var formData = {
            name: name,
            email: email,
            message: message
        };
        
        fetch("https://my-brand-backend-1-g6ra.onrender.com/message", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
       
        .then((data) => {
           
            alert('Message sent successfully');
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('Error sending message. Please try again later.');
        });
    }
    });

       

        
      
    function resetErrorMessages() {
        document.getElementById("email-error").textContent = "";
        document.getElementById("password-error").textContent = "";
        document.getElementById('submit-error').textContent = "";
    }
    function displayErrorMessage(id, message) {
        var errorMessageElement = document.getElementById(id);
        errorMessageElement.textContent = message;
        errorMessageElement.style.color = "red";
    }