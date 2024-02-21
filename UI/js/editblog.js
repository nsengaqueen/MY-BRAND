"use strict";
// Array to store blog posts
let blogPosts = [];
// Function to add a new blog post
function addBlogPost(title, content, image) {
    const newPost = {
        title: title,
        content: content,
        image: image,
        date: new Date().toLocaleDateString()
    };
    blogPosts.push(newPost);
    displayBlogPosts();
}
// Function to display blog posts on the home page
function displayBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    blogPostsContainer.innerHTML = ''; // Clear existing content
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p><strong>Author:</strong> ${post.image}</p>
                <p><strong>Date:</strong> ${post.date}</p>
            `;
        blogPostsContainer.appendChild(postElement);
    });
}
// Event listener for form submission
document.getElementById('form-group').addEventListener('button', function (event) {
    event.preventDefault(); // Prevent default form submission
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('image').value;
    addBlogPost(title, content, author);
    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image').value = '';
});
