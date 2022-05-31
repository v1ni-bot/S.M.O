import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification, updatePassword, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"

const auth = getAuth();


//criar usuario
createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    //Criado e Logado
    const user = userCredential.user;
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});


//logar usuario
signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    //Logado
    const user = userCredential.user;
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});


//identificar usuario conectado
onAuthStateChanged(auth, (user) => {
    if(user) {
        //Usuario logado
        const uid = user.uid;
        // outros valores https://firebase.google.com/docs/reference/js/firebase.User
    } else {
        //Usuário deslogado
    }
});


//tambem pode ser usado a propriedade currentUser, caso não haja a propriedade sera nula
const user = auth.currentUser;
    if(user) {
        //logado
    } else {
        deslogado
    }


//Atualizar usuario
updateProfile(auth.currentUser, {
    displayName: "Jane Q. User", 
    photoURL: "https://example.com/jane/foto.png"
}).then(() => {
    //Usuario atualizado
}).catch((error) => {
    //Erro
});


//Atualizar email
updateEmail(auth.currentUser, "user@example.com").then(() => {
    //Email atualizado
}).catch((error) => {
    //Erro
});


//Email de verificação
// verificar link 
//https://support.google.com/firebase/answer/7000714?authuser=0&hl=pt
//https://firebase.google.com/docs/auth/web/passing-state-in-email-actions?authuser=0&hl=pt
//https://firebase.google.com/docs/auth/web/manage-users?hl=pt&authuser=0#set_a_users_email_address
sendEmailVerification(auth.currentUser)
.then(() => {
    //Email de verificação enviado
});


//Atualizar senha
const newPassword = getASecureRandomPassword();
updatePassword(user, newPassword).then(() => {
    //Atualizado
}).catch((error) => {
    //Erro
});


//Email para Atualizar senha
sendPasswordResetEmail(auth, email)
.then(() => {
    //Email enviado
}).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});


//Excluir Usuario
deleteUser(user).then(() => {
    //Excluido
}).catch((error) => {
    //Erro
});

//Reautenticar como medidas de segurança em ações severas

// TODO(you): prompt the user to re-provide their sign-in credentials
const credential = promptForCredentials();

reauthenticateWithCredential(user, credential).then(() => {
  // User re-authenticated.
}).catch((error) => {
  // An error ocurred
  // ...
});