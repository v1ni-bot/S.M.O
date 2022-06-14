import {getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import {app} from "./app.js";
import {auth} from "./index.js"

const db = getFirestore(app);

const section = document.querySelector('#caixa');

const querySnapshot = await getDocs(collection(db, "chamados"));
querySnapshot.forEach((doc) => {

  const chamado = `<a href="#">
<div class="chamado">
<img id="fotoperfil" src="" alt="">
<p>${doc.predio}</p>
<p>${doc.local}</p>
<p>${doc.problema}</p>
<div id="alerta">${doc.prioridade}</div>
</div>
</a>`;

section.innerHTML = chamado;
  console.log(`${doc.id} => ${doc.data()}`);
});
