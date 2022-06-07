import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js"
import {getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"

const db = getFirestore(app);

var buttonDTI = Document.getElementById('buttonDTI');

window.formDti = async function() {
   var predio = document.getElementById('predio').value;
   var local = document.getElementById('local').value;
   var problema = document.getElementById('problema').value;
   var prioridade = document.getElementById('prioridade').value;
   var descricao = document.getElementById('descricao').value;
   var img = document.getElementById('img').value;

    try {
    const docRef = await addDoc(collection(db, "users"), {
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
     const docRef = await addDoc(collection(db, "users"), {
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

buttonDTI.addEventListener('click', function() {
    window.formDTI();
})