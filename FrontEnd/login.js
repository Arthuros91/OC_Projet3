
const authentificationForm = document.querySelector("#inputBox");
const errorMessage = document.querySelector(".errorMessage");

const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");


const userInput = {
    "email" : "",
    "password" : "",
    "token" : null
};




authentificationForm.addEventListener("submit",async function(event){
    event.preventDefault();

    userInput.email = emailInput.value;
    userInput.password = passwordInput.value;
    const chargeUtileInput = JSON.stringify(userInput);

    const envoiInput = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: chargeUtileInput
    });
    const authentificationUser = await envoiInput.json();

    if (authentificationUser.token != null){
        userInput.token = authentificationUser.token;
        
        const user = JSON.stringify(userInput.token);
        window.localStorage.setItem("userId", user);
        window.location.href="index.html";

    }
    else{
        errorMessage.innerText = "Email ou mot de passe incorrect";
    }

});






