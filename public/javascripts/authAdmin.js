import {getFirestore, collection, serverTimestamp, updateDoc, deleteDoc, doc, getDocs, getDoc, onSnapshot, query, where} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import {app} from "./app.js";
import {auth} from "./index.js"

const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if(user) {
        //Usuario logado

        const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));

        //Atualizações em tempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                if(doc.data().admin == "true"){
                    console.log("Usuário permitido.")
                }else{
                    window.location.replace("/");    
                }
            })
        })
    }else {
    //deslogado
        window.location.replace("/");
    }
});

//--------------------------------------------Função Deslogar-----------------------------------------------------
window.sair = async function() {
    signOut(auth).then(() => {
  
    }).catch((error) => {
    // An error happened.
    });
}