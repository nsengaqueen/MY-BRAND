document.addEventListener('DOMContentLoaded', function() {
    const likeBtn = document.getElementById('like-btn');
    const likeIcon = likeBtn.querySelector('i');
    const likeCountDisplay = document.getElementById('like-count');
    let likeCount = parseInt(localStorage.getItem('likes')) || 0; 
   
    function updateLikeCountDisplay() {
      likeCountDisplay.textContent = `${likeCount} Likes`;
    }
  
   
    updateLikeCountDisplay();
  
   
    likeBtn.addEventListener('click', function() {
      likeCount++; 
      localStorage.setItem('likes', likeCount.toString());
      likeIcon.classList.remove('far');
      likeIcon.classList.add('fas'); 
      updateLikeCountDisplay();
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');
    let comments = JSON.parse(localStorage.getItem('comments')) || []; 
  
  
    function updateCommentsList() {
      commentsList.innerHTML = ''; 
      comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
      });
    }
  
  
    updateCommentsList();
  
    
    submitBtn.addEventListener('click', function() {
      const commentText = commentInput.value.trim();
      if (commentText) {
        comments.push(commentText); 
        localStorage.setItem('comments', JSON.stringify(comments)); 
        updateCommentsList(); 
        commentInput.value = '';
      }
    });
  });
  
  