document.addEventListener('DOMContentLoaded',async function(){

var queryParams = new URLSearchParams(window.location.search);
var blogId = queryParams.get("id") ;

let blogs = document.getElementById("singleBlog") ;


await fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
    method: "GET",
    mode : "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
     

      blogs.innerHTML += `<div  class="blogheader">
      ${data?.title}

     </div>
    <img  src=${data?.images} alt="">
    <div class="blogwords"> 
    <p>
    ${data?.content}
    </p>
    <p>      
    </p>
    <p>
    </p>
    <div class="comments-likes">
    <div class="likes">
   <button id="like-btn" class="like-button">
       <i class="far fa-heart"></i> Like
     </button>
     <div id="like-count">${data?.likes}</div>
     <div id="likeError"></div>
   </div>  

   <button id="submit-comment">Submit</button>
   <textarea id="comment" placeholder="  Add a comment..."></textarea>
   </div>
    </div> `
    var commentCard = ''
    for( var i = blogs.comments?.length-1;i>=0;i--){
    commentCard.innerHTML+=`<div class="commments">
    <div id="comment-form">

    </div>
    <div id="comment-section">
      <h4>Comments:</h4>
      <ul id="comments-list">${data?.comments[i].comment} </ul>
  </div>
    </div>`}
    document.getElementById("commentCard").innerHTML = commentCard
    }
  
    )
  document.getElementById("like-btn").addEventListener('click', function() {
    
    let token = localStorage.getItem("token");

        fetch(`https://my-brand-backend-1-g6ra.onrender.com/like/${blogId}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
              Authorization: token
          }
        
      })
      .then((response) => {
        if (response.ok) {
          location.reload();
          return response.json();
        } else if (response.status === 401) {
          throw new Error("Invalid token");
        } else if (response.status === 400) {
          throw new Error(" blog already liked");
        } else {
          throw new Error("Failed to like");
        }
      })
      .then((data) => {
        console.log(" checking if liked successfully:", data);
      })
      .catch((error) => {
        console.error("Error liking:", error);
        if (error.message === "Invalid token") {
          displayErrorMessage("likeError", "Please login first");
        } else if (error.message === "blog already liked") {
          displayErrorMessage(
            "likeError",
            "blog already liked"
          );
        } else {
          displayErrorMessage(
            "likeError",
            "liking failed Please try again"
          );
        }
      })
      .catch(error => console.error('Error liking:', error));
  });
    
  
  document.getElementById("submit-comment").addEventListener('click', function(e) {
    e.preventDefault();
    var commentInput = document.getElementById('comment').value;
    if(!commentInput){
      alert("no comment entered")
    }
    let token = localStorage.getItem("token");
    
        fetch(`https://my-brand-backend-1-g6ra.onrender.com/add-comment/${blogId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ commentInput }),
          'Accept': 'application/json, tesxt/plain, */*',
      })
      .then((response) => {
        if (response.ok) {
          location.reload();
          return response.json();
        } else if (response.status === 401) {
          throw new Error("Invalid token");
        
        } else {
          throw new Error("Failed to comment");
        }
      })
      .then((data) => {
        console.log(" checking if commented successfully:", data);
      })
      .catch((error) => {
        console.error("Error commenting:", error);
        if (error.message === "Invalid token") {
          displayErrorMessage("likeError", "Please login first");
       
        } else {
          displayErrorMessage(
            "likeError",
            "commenting failed Please try again"
          );
        }
      })
      .catch(error => console.error('Error commenting:', error));
  });
    

    // document.addEventListener('DOMContentLoaded', function() {
    //   const submitBtn = document.getElementById('submit-comment');
    //   const commentInput = document.getElementById('comment');
    //   const commentsList = document.getElementById('comments-list');
    //   let comments = JSON.parse(localStorage.getItem('comments')) || []; 
    
    
    //   function updateCommentsList() {
    //     commentsList.innerHTML = ''; 
    //     comments.forEach(comment => {
    //       const li = document.createElement('li');
    //       li.textContent = comment;
    //       commentsList.appendChild(li);
  
          
    //     });
    //   }
    
    
    //   updateCommentsList();
    
      
    //   submitBtn.addEventListener('click', function() {
    //     const commentText = commentInput.value.trim();
    //     if (commentText) {
    //       comments.push(commentText); 
    //       localStorage.setItem('comments', JSON.stringify(comments)); 
    //       updateCommentsList(); 
    //       commentInput.value = '';
    //     }
    //   });
    // });
    
    // document.getElementById('comments-likes').addEventListener('submit', function(event) {
      // event.preventDefault();
      // localStorage.setItem('users', email);
      // var comment = document.getElementById('comment').value.trim();
      // var user = localStorage.getItem('users'); 
      
      // if (comment-input) {
        
      //   var commentKey = 'comment_' + new Date().getTime();
        
        
      //   localStorage.setItem(commentKey, JSON.stringify({ users, comment  }));
        
        
      //   document.getElementById('commentForm').reset();
      //   alert('Comment submitted successfully!');
        
       
      //   displayComments();
      // } else {
      //   alert('Please enter a comment.');
      // }
    // });
  
})


function resetErrorMessage(id) {
  document.getElementById(id).textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
} 













