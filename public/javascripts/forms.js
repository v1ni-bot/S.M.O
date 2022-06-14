import {getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import {app} from "./app.js";
import {auth} from "./index.js"

const db = getFirestore(app);

console.log("teste");
onAuthStateChanged(auth, (user) => {
    if(user) {
        //Usuario logado
         globalThis.uid = user.uid;
        console.log("logado");
    } else {
       console.log("deslogado");
    }
});

var buttonDTI = document.getElementById('buttonDTI');
var buttonPredial = document.getElementById('buttonPredial');
var buttonOcorrencias = document.getElementById('buttonOcorrencias');

window.formDTI = async function() {
   var predio = document.getElementById('predio').value;
   var local = document.getElementById('local').value;
   var problema = document.getElementById('problema').value;
   var prioridade = document.getElementById('prioridade').value;
   var descricao = document.getElementById('descricao').value;
   var img = document.getElementById('img').value;

    try {
    const docRef = await addDoc(collection(db, "chamados"), {
        tipo: "DTI",
        user: uid,
        predio: predio,
        local: local,
        problema: problema,
        prioridade: prioridade,
        descricao: descricao,
        img: img
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}

window.formPredial = async function() {
    var predio = document.getElementById('predio').value;
    var local = document.getElementById('local').value;
    var problema = document.getElementById('problema').value;
    var prioridade = document.getElementById('prioridade').value;
    var descricao = document.getElementById('descricao').value;
    var img = document.getElementById('img').value;
 
     try {
     const docRef = await addDoc(collection(db, "chamados"), {
        tipo: "PREDIAL",
        user: uid,
        predio: predio,
        local: local,
        problema: problema,
        prioridade: prioridade,
        descricao: descricao,
        img: img
     });
     console.log("Document written with ID: ", docRef.id);
     } catch (e) {
     console.error("Error adding document: ", e);
     }
 }

 window.formOcorrencias = async function() {
    var predio = document.getElementById('predio').value;
    var local = document.getElementById('local').value;
    var tipo = document.getElementById('tipo').value;
    var prioridade = document.getElementById('prioridade').value;
    var descricao = document.getElementById('descricao').value;
    var img = document.getElementById('img').value;
 
     try {
     const docRef = await addDoc(collection(db, "ocorrencias"), {
        tipo: tipo,
        user: uid,
        predio: predio,
        local: local,
        prioridade: prioridade,
        descricao: descricao,
        img: img
     });
     console.log("Document written with ID: ", docRef.id);
     } catch (e) {
     console.error("Error adding document: ", e);
     }
 }

if(buttonDTI){
    buttonDTI.addEventListener('click', function() {
        window.formDTI();
    })
}
if(buttonPredial){
    buttonPredial.addEventListener('click', function() {
        window.formPredial();
    })
}
if(buttonOcorrencias){
    buttonOcorrencias.addEventListener('click', function() {
        window.formOcorrencias();
    })
}