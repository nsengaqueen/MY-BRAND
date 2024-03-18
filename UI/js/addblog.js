document.addEventListener("DOMContentLoaded", function () {
    var dataContainer = document.getElementById("blogContainer");

   
    function createBlog() {
       
        console.log("Creating a new blog...");

        
        var createForm = document.createElement('form');
        createForm.innerHTML = `
           
            <input type="text" id="createTitle" name="createTitle" placeholder="Blog Title"><br><br>
            <textarea id="createContent" name="createContent" rows="4" cols="50" placeholder="Content"></textarea><br><br>
            <input type="file" id="createImage" name="createImage"><br><br>
            <button type="submit" id="submitCreate">Create Blog</button>
        `;

        createForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            let token = localStorage.getItem("token");
            let createTitle = createForm.querySelector('#createTitle').value;
            let createContent = createForm.querySelector('#createContent').value;
            let createImage = createForm.querySelector('#createImage').files[0];

            
            let formData = new FormData();
            formData.append('title', createTitle);
            formData.append('content', createContent);
            formData.append('image', createImage);

            
            fetch("https://my-brand-backend-1-g6ra.onrender.com/blogs", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: token
                },
                body: formData
            })
            .then(response => response.json())
            .then((data) => {
               
                alert('blog created successfully')
                createForm.querySelector('#createTitle').value = '';
                createForm.querySelector('#createContent').value = '';
                createForm.querySelector('#createImage').value = '';
            })
            .catch(error => console.error('Error creating blog:', error));
        });

        dataContainer.appendChild(createForm);
    }

   
    createBlog();

});
