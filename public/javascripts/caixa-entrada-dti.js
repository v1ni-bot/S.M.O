import {getFirestore, collection, getDocs, onSnapshot, query, where} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {app} from "./app.js";

const db = getFirestore(app);

const popup = document.querySelector('[data-js="lista-popups"]');
const section = document.querySelector('[data-js="lista-chamados"]');
const q = query(collection(db, "chamados"), where("tipo", "==", "DTI"));

//Atualizações em tempo real
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  var chamado = '';
  var popups = '';
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
    popups =`
      <div class="popup" id="${doc.id}">
        <div class="popup-content">
          <div class="popup-title" id="popup-title">
            <h1>Chamado: ${doc.id}</h1>
            <span class="close" onclick="window.hideChamado(${doc.id})">&times;</span>
          </div>
          <div class="popup-text" id="popup-text">
            <p>Data de criação: ${doc.data().created_at.toDate()}</p>
            <p>Descrição: ${doc.data().descricao}</p>
            <p>Local: ${doc.data().local}</p>
            <p>Prédio: ${doc.data().predio}</p>
            <p>Prioridade: ${doc.data().prioridade}</p>
            <p>Problema: ${doc.data().problema}</p>
            <p>Status: ${doc.data().status}</p>
            <p>ID do autor: ${doc.data().user}</p>
            <p>Email do autor: ${doc.data().email}</p>
            <p>Nome do autor: ${doc.data().nome}</p>
          </div>
        </div>
      </div>
    `;
    chamado += `
      <a onclick="window.showChamado(${doc.id})">
        <div class="chamado">
          <img id="fotoperfil" src="${photo}" alt="">
          <p>${doc.data().predio}</p>
          <p>${doc.data().local}</p>
          <p>${doc.data().problema}</p>
        <div id="alerta" style="background-color: ${cor};"></div>
        </div>
      </a>
    `;
    popup.innerHTML += popups;
    section.innerHTML = chamado;
  })
})

//--------------------------------------------Função fecha Modal Pop-up-----------------------------------------------------
window.hideModal = async function(){
  var element = document.getElementById('popup');
  element.classList.remove('show-popup');
};

window.hideChamado = async function(popup){
  var element = popup;
  element.classList.remove('show-popup');
};

//--------------------------------------------Função abre Modal Pop-up-----------------------------------------------------
window.showChamado = async function(popup){
  popup.classList.add('show-popup');
};

window.showModal = async function(){
  var element = document.getElementById('popup');
  element.classList.add('show-popup');
};

/*
//Consulta normal
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
    `;
    section.innerHTML = chamado;
});
*/