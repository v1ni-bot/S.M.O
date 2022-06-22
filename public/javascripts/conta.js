import { getAuth, updateProfile, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {getFirestore, doc, updateDoc, collection, deleteDoc, serverTimestamp, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {app} from "./app.js";
import {auth} from "./index.js"

const db = getFirestore(app);

var buttonSalvar = document.getElementById('buttonSalvar');
var buttonAdicionar = document.getElementById('buttonAdicionar');
var buttonRemover = document.getElementById('buttonRemover');
var buttonSenha = document.getElementById('redefinirsenha');

onAuthStateChanged(auth, (user) => {
    if(user) {
        //Usuario logado

        const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));

        //Atualizações em tempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {

                document.getElementById('nome').value = doc.data().nome;
                document.getElementById('email').value = doc.data().email;
                document.getElementById('curso').value = doc.data().curso;
                var modulo = document.getElementById('modulo');
                document.getElementById('curso2').value = doc.data().curso2;
                
                switch(doc.data().modulo){
                    case "1":
                        var selected = `<select id="modulo">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="" disabled>*</option>
                        </select>`
                    break;
                    case "2":
                        var selected = `<select id="modulo">
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                        <option value="3">3</option>
                        <option value="" disabled>*</option>
                        </select>`
                    break;
                    case "3":
                        var selected = `<select id="modulo">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" selected>3</option>
                        <option value="" disabled>*</option>
                        </select>`
                    break;    
                    default:
                        var selected = `<select id="modulo">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="" selected disabled>*</option>
                        </select>`
                }
                modulo.innerHTML = selected
                
                console.log("Dados carregados.");
            })
        })
    }
});

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
            const errorMessage = error.message;
            alert(errorMessage);
            });
        
            //outras informações
            const userRef = doc(db, "usuarios", user.uid);
            Salvar();
            async function Salvar(){ 
                await updateDoc (userRef, {
                    updated_at: serverTimestamp(),
                    nome: nome,
                    email: email,
                    curso: curso,
                    modulo: modulo,
                    curso2: curso2
                });
            }
            
        }
    });
}

window.adicionarFoto = async function() {
    
}

window.redefinirSenha = async function() {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            sendPasswordResetEmail(auth, user.email)
            .then(() => {
                console.log("Email enviado.");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }
    });
}

if(buttonSalvar){
    buttonSalvar.addEventListener('click', function() {
        window.salvarDados();
    })
}

if(buttonSenha){
    buttonSenha.addEventListener('click', function() {
        window.redefinirSenha();
    })
}


//await deleteDoc(doc(db, "cities", "DC"));
