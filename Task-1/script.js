// Contact Form Validation
function validateForm(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let msg = document.getElementById("msg").value;

    if(name=="" || email=="" || msg==""){
        alert("Please fill all fields");
        return false;
    }

    if(!email.includes("@")){
        alert("Enter valid email");
        return false;
    }

    alert("Message sent successfully!");
    return true;
}

// Dark Mode Toggle
function toggleMode(){
   document.body.classList.toggle("dark");
}