import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {getFirestore, doc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {app} from "./app.js";
import {auth} from "./index.js"

const db = getFirestore(app);

var buttonSalvar = document.getElementById('buttonSalvar');
var buttonAdicionar = document.getElementById('buttonAdicionar');
var buttonRemover = document.getElementById('buttonRemover');

window.salvarDados = async function(){
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var curso = document.getElementById('curso').value;
    var modulo = document.getElementById('modulo').value;
    var curso2 = document.getElementById('curso2').value; 


    onAuthStateChanged(auth, (user) => {
        if(user) {
            //nome
            updateProfile(auth.currentUser, {
            displayName: nome
            }).then(() => {
            // Profile updated!
            console.log("Nome salvo!");
            }).catch((error) => {
            // An error occurred
            const errorMessage = error.message;
            alert(errorMessage);
            });
        
            //outras informações
            const userRef = doc(db, "usuarios", user.uid);
            updateDoc (userRef, {
                updated_at: serverTimestamp(),
                nome: nome,
                email: email,
                curso: curso,
                modulo: modulo,
                curso2: curso2
            });
            
        }
    });
}

window.adicionarFoto = async function() {
    
}

if(buttonSalvar){
    buttonSalvar.addEventListener('click', function() {
        console.log("apertou");
        window.salvarDados();
    })
}




//await deleteDoc(doc(db, "cities", "DC"));
