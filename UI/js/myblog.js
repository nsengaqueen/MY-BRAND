document.addEventListener('DOMContentLoaded', async function() {
  var queryParams = new URLSearchParams(window.location.search);
  var blogId = queryParams.get("id");
  let blogs = document.getElementById("singleBlog");
  let commentCard = document.getElementById("commentCard");
  try {
      const response = await fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
          method: "GET",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
          },
      });
      if (!response.ok) {
          throw new Error('Failed to fetch blog details');
      }
      const data = await response.json();

      blogs.innerHTML = `<div class="blogheader">${data.title}</div>
          <img src="${data.images}" alt="">
          <div class="blogwords">
              <p>${data.content}</p>
              <div class="comments-likes">
                  <div class="likes">
                      <button id="like-btn" class="like-button"><i class="far fa-heart"></i> Like</button>
                      <div id="like-count">${data.likes}</div>
                      <div id="likeError"></div>
                  </div>  
                  <button id="submit-comment">Submit</button>
                  <textarea id="comment" placeholder="Add a comment..."></textarea>
              </div>
          </div>`;
      
      // Display comments
     
      commentCard.innerHTML = '<h4>Comments:</h4>';
      data.comments.forEach(comment => {
          commentCard.innerHTML += `<div class="comments">${comment.Name}</div>
          <div class="comments">${comment.comment}</div>`;
      });

  } catch (error) {
      console.error('Error:', error);
  }


  document.getElementById("like-btn").addEventListener('click', async function() {
      let token = localStorage.getItem("token");

      try {
          const response = await fetch(`https://my-brand-backend-1-g6ra.onrender.com/like/${blogId}`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                  Authorization: token
              }
          });
          if (response.ok) {
              location.reload();
          } else if (response.status === 401) {
              throw new Error("Invalid token");
          } else if (response.status === 400) {
              throw new Error("Blog already liked");
          } else {
              throw new Error("Failed to like");
          }
      } catch (error) {
          console.error("Error liking:", error);
          displayErrorMessage("likeError", error.message);
      }
  });

 
  document.getElementById("submit-comment").addEventListener('click', async function(e) {
      e.preventDefault();
      var commentInput = document.getElementById('comment').value.trim();
      if (!commentInput) {
          alert("No comment entered");
          return;
      }
      let token = localStorage.getItem("token");

      try {
          const response = await fetch(`https://my-brand-backend-1-g6ra.onrender.com/add-comment/${blogId}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
              },
              body: JSON.stringify({ comment: commentInput }),
          });
          if (response.ok) {
              location.reload();
          } else if (response.status === 401) {
              throw new Error("Invalid token");
          } else {
              throw new Error("Failed to comment");
          }
      } catch (error) {
          console.error("Error commenting:", error);
          displayErrorMessage("likeError", error.message);
      }
  });
});

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}
