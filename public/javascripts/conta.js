import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user) {
        //Usuario logado
         globalThis.uid = user.uid;
        console.log("logado");
    } else {
       console.log("deslogado");
    }
});

var buttonSalvar = document.getElementById('buttonSalvar');
var buttonAdicionar = document.getElementById('buttonAdicionar');
var buttonRemover = document.getElementById('buttonRemover');

window.salvarDados = async function(){
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var curso = document.getElementById('curso').value;
    var modulo = document.getElementById('modulo').value;
    var curso2 = document.getElementById('curso2').value; 

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
    await setDoc(doc(db, "usuarios", uid), {
        email: email,
        curso: curso,
        modulo: modulo,
        curso2: curso2
      });
}

window.adicionarFoto = async function() {
    
}

if(buttonSalvar){
    buttonSalvar.addEventListener('click', function() {
        window.SalvarDados();
    })
}