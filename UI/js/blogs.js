document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('blog-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const imageInput = document.getElementById('image');
    const blogsList = document.getElementById('blogs-list');
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const fileReader = new FileReader();
        const imageFile = imageInput.files[0];

        fileReader.onloadend = function() {
            const blogId = document.getElementById('edit-id').value || Date.now().toString();
            const blogData = {
                id: blogId,
                title: titleInput.value,
                description: descriptionInput.value,
                image: fileReader.result // Base64 image data
            };

            const existingIndex = blogs.findIndex(blog => blog.id === blogId);
            if (existingIndex > -1) {
                blogs[existingIndex] = blogData;
            } else {
                blogs.push(blogData);
            }

            localStorage.setItem('blogs', JSON.stringify(blogs));
            renderBlogs();
            form.reset();
        };

        if (imageFile) {
            fileReader.readAsDataURL(imageFile);
        }
    });



function renderBlogs() {
    blogsList.innerHTML = blogs.map(blog => `
        <div class="blog-post">
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
            <img src="${blog.image}" alt="Blog Image" style="max-width: 200px; height: auto;">
            <button onclick="editBlog('${blog.id}')">Edit</button>
            <button onclick="deleteBlog('${blog.id}')">Delete</button>
        </div>
    `).join('');
}

window.editBlog = function(id) {
    const blog = blogs.find(blog => blog.id === id);
    document.getElementById('edit-id').value = blog.id;
    titleInput.value = blog.title;
    descriptionInput.value = blog.description;
   
};

window.deleteBlog = function(id) {
    blogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    renderBlogs();
};

});