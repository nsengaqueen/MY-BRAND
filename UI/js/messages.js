function displayMessages() {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    var dashboard = document.getElementById('messagesDashboard');
    dashboard.innerHTML = ''; 
  
    messages.forEach(function(message, index) {
      var messageElement = document.createElement('div');
      messageElement.innerHTML = `
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Message:</strong> ${message.message}</p>
        <hr>
      `;
      dashboard.appendChild(messageElement);
    });
  }
  
  
  displayMessages();
  

