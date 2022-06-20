import {getFirestore, collection, getDocs, query, where} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {app} from "./app.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import {auth} from "./index.js"

const db = getFirestore(app);

const section = document.querySelector('[data-js="lista-chamados"]');

var user = auth.currentUser;

const q = query(collection(db, "chamados"), where("uid", "==", user.uid));
const querySnapshot = await getDocs(q);
var chamado = '';
  querySnapshot.forEach((doc) => {
    switch(doc.data().prioridade){
      case "Alta":
      var cor = "red";
      break;
      case "Média":
      var cor = "yellow";
      break;
      case "Baixa":
      var cor = "#1da8d6";
      break;
      default:
        var cor ="cyan";
    }

    if (doc.data().photoURL){
      var photo = photoURL;
    }else{
      photo ="https://firebasestorage.googleapis.com/v0/b/fir-m-o-33a7b.appspot.com/o/guest1.png?alt=media&token=daf56882-3f80-4453-9303-10bfd7c82692";
    }

    chamado += `
      <a href="/Chamado/${doc.id}">
        <div class="chamado">
          <img id="fotoperfil" src="${photo}" alt="">
          <p>${doc.data().predio}</p>
          <p>${doc.data().local}</p>
          <p>${doc.data().problema}</p>
        <div id="alerta" style="background-color: ${cor};"></div>
        </div>
      </a>
      <a href="/Chamado/${doc.id}">
<div class="chamado">
<img id="fotoperfil" src="${photo}" alt="">
<p>${doc.data().tipo}</p>
<p>${doc.data().predio}</p>
<p>${doc.data().local}</p>
<p>${doc.data().problema}</p>
<p id="status">Status</p>
<div id="alerta"></div>
</div>
</a>
    `;
    section.innerHTML = chamado;
});
/*
//deletar
import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, "cities", "DC"));
*/