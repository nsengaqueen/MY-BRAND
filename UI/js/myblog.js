document.addEventListener('DOMContentLoaded', function() {
    const likeBtn = document.getElementById('like-btn');
    const likeIcon = likeBtn.querySelector('i');
    const likeCountDisplay = document.getElementById('like-count');
    let likeCount = parseInt(localStorage.getItem('likes')) || 0; // Retrieve likes from localStorage or start at 0
  
    // Update like count display
    function updateLikeCountDisplay() {
      likeCountDisplay.textContent = `${likeCount} Likes`;
    }
  
    // Initialize like count display
    updateLikeCountDisplay();
  
    // Toggle heart icon and update like count
    likeBtn.addEventListener('click', function() {
      likeCount++; // Increment like count
      localStorage.setItem('likes', likeCount.toString()); // Store updated count in localStorage
      likeIcon.classList.remove('far');
      likeIcon.classList.add('fas'); // Change icon to solid heart
      updateLikeCountDisplay();
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');
    let comments = JSON.parse(localStorage.getItem('comments')) || []; // Retrieve comments or start with an empty array
  
    // Function to update the comment list UI
    function updateCommentsList() {
      commentsList.innerHTML = ''; // Clear existing comments
      comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
      });
    }
  
    // Initialize comments list from localStorage on page load
    updateCommentsList();
  
    // Event listener for the submit button
    submitBtn.addEventListener('click', function() {
      const commentText = commentInput.value.trim();
      if (commentText) {
        comments.push(commentText); // Add new comment to the array
        localStorage.setItem('comments', JSON.stringify(comments)); // Update localStorage
        updateCommentsList(); // Update UI
        commentInput.value = ''; // Clear input field
      }
    });
  });
  
  