var dataContainer = document.getElementById("bloglist");
toFetchBlogs();
function toFetchBlogs() {
  fetch("https://my-brand-backend-1-g6ra.onrender.com/blogs", {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
      let i = 0;
      console.log(data.data)
      data.data.reverse().forEach(function (blog) {
        dataContainer.innerHTML += `
        <a href="/UI/others.html/myblog.html?id=${blog._id}"  class="blogs">
           
    
            <img class="blogimg" src =${blog.images} >  
    
            <div class="blog_details">

            <h3 class"modify">${blog.title}</h3>
            <p class="modify">${blog.content}</p>
            
            
            </div>
           
            </a>`;
        i++;
      });
    
    });
}