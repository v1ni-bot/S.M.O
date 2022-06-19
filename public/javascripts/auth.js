import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import {app} from "./app.js";
import {auth} from "./index.js"

onAuthStateChanged(auth, (user) => {
    if(user) {
        //Usuario logado
        console.log("Usuário permitido.");
    } else {
    //deslogado
        window.location.replace("/");
    }
});