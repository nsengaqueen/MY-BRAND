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
                <img id="blogimg" class="blogimg" src="${blog.images}">
                <div class="blog_details">
                    <input type="text" id="edit-title" class="edit-title" value="${blog.title}">
                    <textarea class="edit-content" id = "edit-content">${blog.content}</textarea>
                    <button class="save-button" id ="save" onclick "saveChanges(blog._id)" >Save</button>
                    <button class="delete-button" data-blog-id="${blog._id}">Delete</button>
                </div>
            `;
            dataContainer.appendChild(blogElement);

            var deleteButton = blogElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                deleteBlog(blog._id);
            });

            var saveButton = blogElement.querySelector('.save-button');
            saveButton.addEventListener('click', function () {
                saveChanges(blog._id);
            });
        });
    });

    function deleteBlog(blogId) {
        let token = localStorage.getItem("token")
        fetch(`https://my-brand-backend-1-g6ra.onrender.com//blogs/${blogId}`, {
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

    function saveChanges(blogId) {
        // var editedTitle = document.querySelector(`.blog[data-blog-id="${blogId}"] .edit-title`);
        // var editedContent = document.querySelector(`.blog[data-blog-id="${blogId}"] .edit-content`);
        // var editedImage = document.querySelector(`.blog[data-blog-id="${blogId}"] .edit-image`);
        const editedBlog = {
            title : document.getElementById("edit-title"),
            content : document.getElementById("edit-content"),
            
        }
        let token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("title",editedBlog.title),
        formData.append("content",editedBlog.content),
        // formData.append("image",document.getElementById("blogimg").files[0])


        
        fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Show alert to indicate changes are saved
            window.alert('Changes saved successfully!');
            console.log('Blog updated successfully:', data);
        })
        .catch(error => console.error('Error updating blog:', error));
    }
});
