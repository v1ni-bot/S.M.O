import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"

const auth = getAuth();

var btnEntrar = document.getElementById('btnentrar');
var btnCadastrar = document.getElementById('btncadastrar');

window.login = async function() {
    var inEmail = document.getElementById('inemail').value;
    var inPass = document.getElementById('inpass').value;

    signInWithEmailAndPassword(auth, inEmail, inPass).then((userCredential) => {
        //Logado
        alert('Logado com sucesso.');
        const user = userCredential.user;
        console.log(user);
        window.location.replace("/menu-admin");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

window.register = async function() {
    var upEmail = document.getElementById('upemail').value;
    var upPass = document.getElementById('uppass').value;

    createUserWithEmailAndPassword(auth, upEmail, upPass).then((userCredential) => {
        //Criado e Logado
        alert('Usuario criado com sucesso.');
        window.location.assign('index2.html');
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

btnEntrar.addEventListener('click', function() {
            window.login();
})

btnCadastrar.addEventListener('click', function() {
    var upPass = document.getElementById('uppass').value;
    var reUpPass = document.getElementById('reuppass').value;


    if ( upPass == reUpPass){
       window.register(); 
    }
    else{
        alert('Verifique sua senha.');
    }
})