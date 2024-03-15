document.addEventListener("DOMContentLoaded", function () {
    var dataContainer = document.getElementById("blogContainer");

    fetch("http://localhost:5000/blogs", {
        mode: "cors",
    })
    .then((res) => res.json())
    .then((data) => {
        data.data.reverse().forEach(function (blog) {
            var blogElement = document.createElement('div');
            blogElement.classList.add('blog');
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

            // Add event listeners for edit and delete buttons
            var editButton = blogElement.querySelector('.edit-button');
            editButton.addEventListener('click', function () {
                editBlog(blog._id);
            });

            var deleteButton = blogElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                deleteBlog(blog._id);
            });
        });
    });

    function editBlog(blogId) {
        // Redirect to edit page with blog ID
        window.location.href = `../Admin/editblog.html?id=${blogId}`;
    }

    function deleteBlog(blogId) {
        // Send delete request to server
        fetch(`http://localhost:5000/blogs/${blogId}`, {
            method: 'DELETE',
            mode: 'cors',
        })
        .then(response => {
            if (response.ok) {
                // Remove the blog from the UI
                var blogElement = document.querySelector(`.blog .blog_details button[data-blog-id="${blogId}"]`).closest('.blog');
                blogElement.remove();
            }
        })
        .catch(error => console.error('Error deleting blog:', error));
    }
});
