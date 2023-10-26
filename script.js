const sendIcon = document.getElementById("sendinIcon");
const chatContent = document.querySelector(".chat-content");

function showUserQuery() {
    const userInput = document.getElementById("userInputField").value;
    const userQuery = document.createElement("li");
    userQuery.innerText = userInput;
    chatContent.appendChild(userQuery);
}

function speechRecognition() {
    const userQuery = document.createElement("li");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US"//"fr-FR";
    recognition.interimResults = true;

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
sendIcon.addEventListener("click", showUserQuery());
const micIcon = document.querySelector("#mic-icon");
// Réagir au clic sur l'icône du microphone
micIcon.addEventListener('click', speechRecognition());

const inputField = document.getElementById("userInputField");

// Réagir à la pression de la touche "Entrée" pour envoyer la requête
inputField.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        showUserQuery();
        event.preventDefault();
        inputField.value = "";
        return false;
    }
});
