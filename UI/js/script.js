document.addEventListener('DOMContentLoaded', function() {
    const blogsContainer = document.getElementById('blogs-container');
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    function renderBlogs() {
        if (blogs.length === 0) {
            blogsContainer.innerHTML = '<p>No blog posts to display.</p>';
            return;
        }

        blogsContainer.innerHTML = blogs.map(blog => `
            <div class="blog-post">
                <h3>${blog.title}</h3>
                <p>${blog.description}</p>
                <img src="${blog.image}" alt="Blog Image" style="max-width: 200px; height: auto;">
            </div>
        `).join('');
    }

    renderBlogs();
});


document.addEventListener('DOMContentLoaded', function() {
    const loginLogoutButton = document.getElementById('loginLogoutButton');

    function updateButton() {
        
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginLogoutButton.textContent = 'Logout';
            loginLogoutButton.onclick = function() {
              
                localStorage.setItem('isLoggedIn', 'false');

                window.location.href = "../index.html"; 
            };
        } else {
            loginLogoutButton.textContent = 'Login';
            loginLogoutButton.onclick = function() {
                
                localStorage.setItem('isLoggedIn', 'true');
                // alert('You are now logged in.');
                updateButton(); 
            };
        }
    }

    updateButton(); 
});

