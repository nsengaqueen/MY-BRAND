function displayMessages() {
  var dashboard = document.getElementById('messagesDashboard');
  fetch("https://my-brand-backend-1-g6ra.onrender.com/message", {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
    console.log(data)
      data.data.forEach(function(message) {
        var messageElement = document.createElement('div');
        messageElement.innerHTML = `
          <p><strong>Name:</strong> ${message.name}</p>
          <p><strong>Email:</strong> ${message.email}</p>
          <p><strong>Message:</strong> ${message.message}</p>
          <hr>
        `;
        dashboard.appendChild(messageElement);
      });
    })
    dashboard.innerHTML = ''; 
  
  }
  
  
  displayMessages();
  

