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
    </div> `
    })

})















// document.addEventListener('DOMContentLoaded', function() {
//     const likeBtn = document.getElementById('like-btn');
//     const likeIcon = likeBtn.querySelector('i');
//     const likeCountDisplay = document.getElementById('like-count');
//     let likeCount = parseInt(localStorage.getItem('likes')) || 0; 
   
//     function updateLikeCountDisplay() {
//       likeCountDisplay.textContent = `${likeCount} Likes`;
//     }
  
   
//     updateLikeCountDisplay();
  
   
//     likeBtn.addEventListener('click', function() {
//       likeCount++; 
//       localStorage.setItem('likes', likeCount.toString());
//       likeIcon.classList.remove('far');
//       likeIcon.classList.add('fas'); 
//       updateLikeCountDisplay();
//     });
//   });

//   document.addEventListener('DOMContentLoaded', function() {
//     const submitBtn = document.getElementById('submit-comment');
//     const commentInput = document.getElementById('comment');
//     const commentsList = document.getElementById('comments-list');
//     let comments = JSON.parse(localStorage.getItem('comments')) || []; 
  
  
//     function updateCommentsList() {
//       commentsList.innerHTML = ''; 
//       comments.forEach(comment => {
//         const li = document.createElement('li');
//         li.textContent = comment;
//         commentsList.appendChild(li);

        
//       });
//     }
  
  
//     updateCommentsList();
  
    
//     submitBtn.addEventListener('click', function() {
//       const commentText = commentInput.value.trim();
//       if (commentText) {
//         comments.push(commentText); 
//         localStorage.setItem('comments', JSON.stringify(comments)); 
//         updateCommentsList(); 
//         commentInput.value = '';
//       }
//     });
//   });
  
//   document.getElementById('comments-likes').addEventListener('submit', function(event) {
//     event.preventDefault();
//     localStorage.setItem('users', email);
//     var comment = document.getElementById('comment').value.trim();
//     var user = localStorage.getItem('users'); 
    
//     if (comment-input) {
      
//       var commentKey = 'comment_' + new Date().getTime();
      
      
//       localStorage.setItem(commentKey, JSON.stringify({ users, comment  }));
      
      
//       document.getElementById('commentForm').reset();
//       alert('Comment submitted successfully!');
      
     
//       displayComments();
//     } else {
//       alert('Please enter a comment.');
//     }
//   });
  