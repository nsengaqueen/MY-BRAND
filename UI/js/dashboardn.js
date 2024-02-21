let data = [
    { id:1, name:"keza", email:"keza@gmail.com"},
    { id:2, name:"elara", email:"elara@gmail.com",}
]

function readAll(){
    localStorage.setItem("object",JSON.stringify(data));
    var tabledata = document.querySelector(".data_table");

    var object =  localStorage.getItem('object');
    var objectdata = JSON.parse(object);
    var elements = "";

    objectdata.map(record =>(
        elements +=  `<tr>
        <td>${record.name}</td>
        <td>${record.email}  </td>
    
    </tr>
    <td>
        <button class="edit" onclick={edit(${record.id})}>Edit</button>
        <button class="delete" onclick={delete(${record.id})}>Delete</button>
    </td>
    </tr>`
    ))
    
    tabledata.innerHTML = elements;
    }
    
function delet(id){
    data = data.filter(rec => rec.id !==id );
    readAll();

}





function create(){
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add_div").style.display = "none";
}
function add(){
    var name = document.querySelector(".name").value;
    var email = document.querySelector(".email").value;
     
    var newObj = {id: 3 , name: name, email: email,}

    data.push(newObj)

    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add_div").style.display ="block";

       readAll();
}
function edit(id){
   document.querySelector('.update_form').style.display ="block";
   var obj = data.find(rec => rec.id === id);
   document.querySelector('.uname').value = obj.name;
   document.querySelector('.uemail').value = obj.email;
   document.querySelector('.id').value = obj.id;

}

function update(){
    var id =  parseInt(document.querySelector('.id').value);
    var name =  document.querySelector('.uname').value ;
    var email =  document.querySelector('.uemail').value ;
   

    var index = data.findIndex(rec => rec.id === id)
    data[index] = {id,name,email};

    document.querySelector('.update_form').style.display = "block"
    readAll();
}
 