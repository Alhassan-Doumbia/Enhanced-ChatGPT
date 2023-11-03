// On va d'abord gerer la possibilité d'afficher les requêtes de l'utilisateur à l'écran 

const logIcon= document.getElementById("LogIcon");
let sendinIcon=document.getElementById("sendinIcon");
let chat_content=document.querySelector(".chat-content");
let inputField=document.getElementById("userInputField")//Pour pouvoir utiliser la touche entré
function showUserQuery(){
    let Query=document.getElementById("userInputField").value;
    let userQuery=document.createElement("li")
    userQuery.innerText=`${Query}`;//On a enlevé le Label ser car tout ce qui vient de l'user est en gris
    //et tout ce qui viendra de l'API sera en bleu 
    chat_content.appendChild(userQuery); 
    inputField.value="";return false;//Pour vider le contenu du bail
}
function speechReco(){
    let userQuery=document.createElement("li")
    var speechRecognition=window.speechRecognition || window.webkitSpeechRecognition;
    var recognition=new speechRecognition;
    recognition.continuous=false;
    recognition.lang="fr-FR";
    recognition.interimResults=true;
    //fin setup
    let currentTranscription = ''; // Stockage de la transcription actuelle
    let timeout; 
    recognition.onresult=function(event){
        let interimTranscript=event.results[0][0].transcript;
        if(timeout){
            clearTimeout(timeout)
        }
        timeout=setTimeout(()=>{
            // Pause détectée, ajoutez la transcription intermédiaire à la transcription complète
            currentTranscription += interimTranscript + ' ';
            userQuery.innerText=currentTranscription;
            chat_content.appendChild(userQuery);
        },1000)
    }
    recognition.start();
}
//Important : dans ces deux blocs d'actions , faudra trouver un moyen pour faire en sorte que le contenu de Show UserQuery et de SpeechReco
//soit envoyé à L'API de chatGPT

sendinIcon.addEventListener("click",()=>{
    if(inputField.value===""){
        console.log("empty prompt , not displayed")
    }
    if(inputField.value !=""){
        logIcon.style="animation:logrotation 3s ease-in-out 3"
        setTimeout(()=>{logIcon.style=""},9000)
        showUserQuery()}
})//il faut trouver une methode qui me permettteras de savois si le truc est rempli ou non


//ecrire(showUserQuery()) proovoque un appel immédiat de la fonction et donc lannce la reconnaissance vocale  au chargement de la page 
// j'aurais pas pu m'en apercevoir car jusque là j'utilisais pas des fonctions hyper dynamiques , mais toujours est il que mes autres fonctions font le taff , même si
//il font un appel immédiat , en fait c'est ce qui creait la bulle où y avait rien
//Integration de la reconnaissance vocale 
let micIcon=document.querySelector("#mic-icon");
micIcon.addEventListener('click',speechReco)

//utiliser le champs de l'input pour pouvoir utliser la touche entrer
inputField.addEventListener('keypress',function (event) {
    if(event.keyCode===13 && inputField.value==""){
        console.log("empty prompt,not displayed")
        event.preventDefault();
    }
    if(event.keyCode===13&& inputField.value != ""){
         showUserQuery();
         event.preventDefault();
         logIcon.style="animation:logrotation 3s ease-in-out 3"//pour pouvoir animer la page le temps que la reponse de GPT ne vienne 
         setTimeout(()=>{logIcon.style=""},9000);//permet de vider la propriété d'aimation
         inputField.value="";return false;//Pour vider le contenu du bail

        }
        
})



// On va utiliser quasiment la même methode mais cette fois ci on va faire entrer une API dans le game 

//PS : JE DOIS DESACTIVER L'AUTOSAVE LORSQUE JE COMMENCERAI A UTILISER L'API de chat GPT
/**Pour la reconnaissance vocale : 
 * creer une fonction de speech recognition contenant les éléments suivant {
 * -initialiser la reconnaissance vocale 
 * -demarer la reconnaissanc vocale 
 * -lancer un timer de 60s qui s'affiche sur l'interface et qui devient rouge quand 
 * on atteiint les 10s restantes 
 * -à la fin du timer  recuperer la transcription ,
 * -afficher la transcription sur l'interface 
 * }
 * 
 *Suite du programme :
 -envoyer la transcription à chatGPT 
 -recuperer la reponse de GPT
 -afficher la reponse de GPT sur l'interface
 * 
 */
