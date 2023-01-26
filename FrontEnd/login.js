
const authentificationForm = document.querySelector("#inputBox");
const errorMessage = document.querySelector(".errorMessage");

const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");


const user = {
    "email" : "sophie.bluel@test.tld",   
    "password" : "S0phie",
    "token" : null

};

const fakeUser  = {
    "email" : "gaga",
    "password" :"fhfhgjgk"
};

const userInput = {
    "email" : emailInput.value,
    "mot de passe" : passwordInput.value,
    "token" : null
};
const chargeUtileInput = JSON.stringify(userInput);


const chargeUtile = JSON.stringify(user);
const chargeInutile = JSON.stringify(fakeUser);



authentificationForm.addEventListener("submit",async function(event){
    event.preventDefault();

    const envoiInput = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: chargeUtileInput
    });
    const authentificationUser = await envoiInput.json();
    console.log(authentificationUser);
    console.log(userInput);

    if (authentificationUser.token != null){
        userInput.token = authentificationUser.token;
        window.location.href="index.html";
    }
    else{
        errorMessage.innerText = "Email ou mot de passe incorrect";
    }

});



