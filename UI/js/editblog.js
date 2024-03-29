document.addEventListener("DOMContentLoaded", function () {
    var dataContainer = document.getElementById("blogContainer");

    fetch("https://my-brand-backend-1-g6ra.onrender.com/blogs", {
        mode: "cors",
    })
    .then((res) => res.json())
    .then((data) => {
        data.data.reverse().forEach(function (blog) {
            var blogElement = document.createElement('div');
            blogElement.classList.add('blog');
            blogElement.dataset.blogId = blog._id; 
            blogElement.innerHTML = `
                <img class="blogimg" src="${blog.images}">
                <div class="blog_details">
                    <h3 class="modify">${blog.title}</h3>
                    <p class="modify">${blog.content}</p>
                    <button class="edit-button" data-blog-id="${blog._id}">Edit</button>
                    <button class="delete-button" data-blog-id="${blog._id}">Delete</button>
                </div>
            `;
            dataContainer.appendChild(blogElement);

            var deleteButton = blogElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                deleteBlog(blog._id);
            });

            var editButton = blogElement.querySelector('.edit-button');
            editButton.addEventListener('click', function () {
               
                var currentTitle = blogElement.querySelector('h3').innerText;
                var currentContent = blogElement.querySelector('p').innerText;
                editBlog(blog._id, currentTitle, currentContent); 
            });
        });
    });

    function deleteBlog(blogId) {
        let token = localStorage.getItem("token");
        fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Authorization: token
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log('deleted successfully', data);
           
            var deletedBlogElement = document.querySelector(`.blog[data-blog-id="${blogId}"]`);
            if (deletedBlogElement) {
                deletedBlogElement.remove();
            }
        })
        .catch(error => console.error('Error deleting blog:', error));
    }

    function editBlog(blogId, currentTitle, currentContent) {
        console.log("Editing blog with ID:", blogId);
        var blogElement = document.querySelector(`.blog[data-blog-id="${blogId}"]`);
        if (!blogElement) {
            console.error(`Blog element with ID ${blogId} not found.`);
            return;
        }

        var blogDetails = blogElement.querySelector('.blog_details');
        if (!blogDetails) {
            console.error(`Blog details not found for blog with ID ${blogId}.`);
            return;
        }

        var editForm = document.createElement('form');
        editForm.innerHTML = `
            <label for="editTitle">Title:</label>
            <input type="text" id="editTitle" name="editTitle" value="${currentTitle}"><br><br>
            <label for="editContent">Content:</label><br>
            <textarea id="editContent" name="editContent" rows="4" cols="50">${currentContent}</textarea><br><br>
            <button type="submit" id="submitEdit">Submit Edit</button>
        `;

        editForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            let token = localStorage.getItem("token");
            let editedTitle = editForm.querySelector('#editTitle').value;
            let editedContent = editForm.querySelector('#editContent').value;

            fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    title: editedTitle,
                    content: editedContent
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log('Blog updated successfully', data);
               
                blogElement.querySelector('h3').innerText = editedTitle;
                blogElement.querySelector('p').innerText = editedContent;
            })
            .catch(error => console.error('Error updating blog:', error));
        });

        blogDetails.innerHTML = ''; 
        blogDetails.appendChild(editForm);
    }
});
