// On va d'abord gerer la possibilité d'afficher les requêtes de l'utilisateur à l'écran 
let sendinIcon=document.getElementById("sendinIcon");
let chat_content=document.querySelector(".chat-content");

function showUserQuery(){
    let Query=document.getElementById("userInputField").value;
    let userQuery=document.createElement("li")
    userQuery.innerText=`User : ${Query}`;
    chat_content.appendChild(userQuery); 
}
//On va gérer le clic sur le bouton pour envoyer une requête
sendinIcon.addEventListener("click",showUserQuery())

let inputField=document.getElementById("userInputField")//Pour pouvoir utiliser la touche entré
inputField.addEventListener('keypress',function (event) {
    if(event.keyCode===13){showUserQuery();event.preventDefault();
         inputField.value="";return false;//Pour vider le contenu du bail
        }//Comparer l'event(paamètre)  au code de la touche entrée , si oui , on execute notre bail
})

// On va utiliser quasiment la même methode mais cette fois ci on va faire entrer une API dans le game 

