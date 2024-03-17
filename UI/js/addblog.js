document.addEventListener("DOMContentLoaded", function () {
    var dataContainer = document.getElementById("blogContainer");

    // Function to create a new blog
    function createBlog() {
        // Your code to handle creating a new blog, such as showing a form for input
        // After obtaining the new blog data, you can send a POST request to the backend to create the blog
        console.log("Creating a new blog...");

        // Example: Show a form for input
        var createForm = document.createElement('form');
        createForm.innerHTML = `
            <label for="createTitle">Title:</label>
            <input type="text" id="createTitle" name="createTitle"><br><br>
            <label for="createContent">Content:</label><br>
            <textarea id="createContent" name="createContent" rows="4" cols="50"></textarea><br><br>
            <input type="file" id="createImage" name="createImage"><br><br>
            <button type="submit" id="submitCreate">Create Blog</button>
        `;

        createForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission behavior
            
            let token = localStorage.getItem("token");
            let createTitle = createForm.querySelector('#createTitle').value;
            let createContent = createForm.querySelector('#createContent').value;
            let createImage = createForm.querySelector('#createImage').files[0];

            // Make a FormData object to send form data including file
            let formData = new FormData();
            formData.append('title', createTitle);
            formData.append('content', createContent);
            formData.append('image', createImage);

            // Make a POST request to create the blog on the backend
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
                console.log('Blog created successfully', data);
                // Optionally, you can redirect to another page or show a success message
            })
            .catch(error => console.error('Error creating blog:', error));
        });

        dataContainer.appendChild(createForm);
    }

    // Call the createBlog function
    createBlog();

});
