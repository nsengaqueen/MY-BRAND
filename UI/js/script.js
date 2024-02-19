var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
  for(tablink of tablinks){
    tablink.classList.remove("active-link");
  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");

}
event.currentTarget.classList.add("active-link");
document.getElementById(tabname).classList.add("active-tab");
}




var sidemenu = document.getElementById("sidemenu")
function openmenu(){
  sidemenu.style.right ="0"
}
function closemenu(){
  sidemenu.style.right = "-200px";
}























const name = document.getElementById('name')
const password = document.getElementById('email')
const message = document.getElementById('message')
const errorElement = document.getElementById('error')

function validateName(){
    var name = document.getElementById('contact-name').value;

    if(name.lenght == 0){
        nameError.innerHTML = 'Name is required';
        return false
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*&/)){
     nameError.innerHTML = 'Write full name';
     return false;
    }

    nameError.innerHTML='<i class="fa-solid fa-check-to-slot"></i>';
    return true;
    ;
}

function validateEmail(){
    var email = document.getElementById().value;
    if(email.length == 0)
    email.Error.innerHTML = 'email is required'
return false;
}
if(!email.match(/^[A-Za-z]\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
    emailError.innerHTML = 'Email is Invalid'
    return false;
}
emailError.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';
return true;

function validateMessage(){
    var message = document.getElementById('contact-message').value;
    var required = 30;
    var left = required - message.length;

    if (left>0){
        messageError.innerHTML = left + 'more characters required';
        return false;

    }

    messageError.innerHTMl = '<i class="fa-solid fa-check-to-slot"></i>'
    return true;
}
