document.addEventListener('DOMContentLoaded',async function(){

var queryParams = new URLSearchParams(window.location.search);
var blogId = queryParams.get("id") ;

let blogs = document.getElementById("singleBlog") ;


await fetch(`https://my-brand-backend-1-g6ra.onrender.com/blogs/${blogId}`, {
    method: "GET",
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
   </div>  

   <div class="commments">
     <div id="comment-form">
       <textarea id="comment" placeholder="  Add a comment..."></textarea>
       <button id="submit-comment">Submit</button>
     </div>
     <div id="comment-section">
       <h4>Comments:</h4>
       <ul id="comments-list">${data?.comments} </ul>
   </div>
     </div>
   </div>
    </div> `
    })
  document.getElementById("like-btn").addEventListener('click', function() {
    
    let token = localStorage.getItem("token");

        fetch(`https://my-brand-backend-1-g6ra.onrender.com/like/${blogId}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
              Authorization: token
          }
        
      })
      .then(response => response.json())
      .then((data) => {
         
          alert('liked successfully')
         
      })
      .catch(error => console.error('Error liking:', error));
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















