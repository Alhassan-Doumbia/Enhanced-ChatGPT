const sendIcon = document.getElementById("sendinIcon");
const chatContent = document.querySelector(".chat-content");
const inputField = document.getElementById("userInputField");
function showUserQuery() {
    const userInput = document.getElementById("userInputField").value;
    const userQuery = document.createElement("li");
    userQuery.innerText = userInput;
    chatContent.appendChild(userQuery);
    inputField.value = "";
    return false;
}

function speechRecognition() {
    const userQuery = document.createElement("li");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "fr-FR"//"en-US";
    recognition.interimResults = true;
    console.log('clicked');// pour le debogage 
    let currentTranscription = '';
    let timeout;

    recognition.onresult = function (event) {
        const interimTranscript = event.results[0][0].transcript;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            currentTranscription += interimTranscript + ' ';
            userQuery.innerText = currentTranscription;
            chatContent.appendChild(userQuery);
        }, 1000);
    }
    recognition.start();
}

// Réagir au clic sur l'icône d'envoi
sendinIcon.addEventListener("click",()=>{
    if(inputField.value===""){console.log("empty prompt , not displayed")}
    if(inputField.value !=""){showUserQuery()}})

const micIcon = document.querySelector("#mic-icon");
// Réagir au clic sur l'icône du microphone
micIcon.addEventListener("click", speechRecognition);// on a supprimé 
// Réagir à la pression de la touche "Entrée" pour envoyer la requête
inputField.addEventListener('keypress', function (event) {

    if(event.keyCode===13 && inputField.value==""){
        console.log("empty prompt,not displayed")
        event.preventDefault();
    }
    if (event.keyCode === 13) {
        showUserQuery();
        event.preventDefault();
        inputField.value = "";
        return false;
    }
    
});
//commentaire pour me permettre de commit