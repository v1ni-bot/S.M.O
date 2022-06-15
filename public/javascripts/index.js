import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, updateProfile} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';

const auth = getAuth();

export {auth};

setPersistence(auth, browserSessionPersistence);

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
        //Salvando imagem
        updateProfile(auth.currentUser, {
        photoURL: "https://firebasestorage.googleapis.com/v0/b/fir-m-o-33a7b.appspot.com/o/guest1.png?alt=media&token=daf56882-3f80-4453-9303-10bfd7c82692"
        }).then(() => {
        // Profile updated!
        console.log("Foto salva com sucesso!")
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
        alert('Usuario criado com sucesso.');
        window.location.replace("/menu-admin");

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

if(btnEntrar){
    btnEntrar.addEventListener('click', function() {
        window.login();
    })
}

if(btnCadastrar){
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
}