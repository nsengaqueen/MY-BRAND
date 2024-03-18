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

        
            function displayBlogs() {
                fetch("https://my-brand-backend-1-g6ra.onrender.com/blogs")
                    .then((res) => res.json())
                    .then((data) => {
                        data.forEach(function (blog) {
                            
                            var blogElement = document.createElement('div');
                            blogElement.innerHTML = `
                                <h2>${blog.title}</h2>
                                <p>${blog.content}</p>
                                <button onclick="editBlog('${blog._id}', '${blog.title}', '${blog.content}')">Edit</button>
                                <button onclick="deleteBlog('${blog._id}')">Delete</button>
                            `;
                            blogContainer.appendChild(blogElement);
                        });
                    });
            }
            
            

            var deleteButton = blogElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                deleteBlog(blog._id);
            });
            var editButton = blogElement.querySelector('.edit-button');
            editButton.addEventListener('click', function () {
                editBlog(blog._id, blog.title, blog.content); 
            });
        });
    });

   
    function deleteBlog(blogId) {
        let token = localStorage.getItem("token")
        fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers:{
                Authorization:token
            }
        })
        .then(response => response.json() )
        .then((data)=>{
            console.log('deleted successfully',data)
        })
        .catch(error => console.error('Error deleting blog:', error));
    }

    function editBlog(blogId, currentTitle, currentContent) {
        
        blogContainer.innerHTML = '';

      
        var editForm = document.createElement('form');
        editForm.innerHTML = `
            <input type="text" id="editTitle" value="${currentTitle}">
            <textarea id="editContent">${currentContent}</textarea>
            <button onclick="updateBlog('${blogId}')">Update</button>
        `;
        blogContainer.appendChild(editForm);
    }

   
    function updateBlog(blogId) {
        var editedTitle = document.getElementById('editTitle').value;
        var editedContent = document.getElementById('editContent').value;

       
        fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: editedTitle,
                content: editedContent
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Blog updated successfully');
                displayBlogs(); 
            } else {
                throw new Error('Failed to update blog');
            }
        })
        .catch(error => console.error('Error updating blog:', error));
    }
    // displayBlogs();
    
    
});
