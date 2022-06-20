import {getFirestore, collection, addDoc, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";
import {app} from "./app.js";
import {auth} from "./index.js"

const storage = getStorage(app);
const db = getFirestore(app);

console.log("teste");
onAuthStateChanged(auth, (user) => {
    if(user) {
        //Usuario logado
        globalThis.uid = user.uid;
        globalThis.displayName = user.displayName;
        globalThis.email = user.email;
        console.log("logado");
    } else {
        console.log("deslogado");
    }
});

var buttonDTI = document.getElementById('buttonDTI');
var buttonPredial = document.getElementById('buttonPredial');
var buttonOcorrencias = document.getElementById('buttonOcorrencias');


window.selectDinamico = async function(predio){

    var selectLocal = document.getElementById('local');
    switch(predio){
        case "Prédio Administrativo":
            selectLocal.innerHTML = `
            <option value="Prédio Administrativo">Prédio Administrativo</option>
            <option value="Diretoria de Serviços">Diretoria de Serviços</option>
            <option value="Diretoria Acadêmica">Diretoria Acadêmica</option>
            <option value="Departamento de Informática">Departamento de Informática</option>
            <option value="Coordenação de Cursos">Coordenação de Cursos</option>
            <option value="Coordenação Pedagógica">Coordenação Pedagógica</option>
            <option value="Direção">Direção</option>
            <option value="Secretaria">Secretaria</option>
            <option value="Coordenação de Área">Coordenação de Área</option>
            <option value="Computadores/Professores">Computadores/Professores</option>
            <option value="Sala dos Professores">Sala dos Professores</option>`
        break;
        case "Biblioteca":
            selectLocal.innerHTML = `<option value="Biblioteca">Biblioteca</option>`
        break;
        case "Anexo":
            selectLocal.innerHTML = `
            <option value="Anexo">Anexo</option>
            <option value="Entrada">Entrada</option>
            <option value="Sala A">Sala A</option>
            <option value="Sala B">Sala B</option>`
        break;
        case "Bloco A":
            selectLocal.innerHTML = `
            <option value="Corredores">Corredores</option>
            <option value="Banheiro Feminino">Banheiro Feminino</option>
            <option value="Banheiro Masculino">Banheiro Masculino</option>
            <option value="Sala A">Sala A</option>
            <option value="Sala B">Sala B</option>
            <option value="Sala C">Sala C</option>
            <option value="Sala D">Sala D</option>
            <option value="Laboratório A">Laboratório A</option>
            <option value="Laboratório B">Laboratório B</option>
            <option value="Laboratório C">Laboratório C</option>
            <option value="Laboratório D">Laboratório D</option>`
        break;
        case "Bloco B":
            selectLocal.innerHTML = `
            <option value="Corredores">Corredores</option>
            <option value="Banheiro Feminino">Banheiro Feminino</option>
            <option value="Banheiro Masculino">Banheiro Masculino</option>
            <option value="Sala A">Sala A</option>
            <option value="Sala B">Sala B</option>
            <option value="Sala C">Sala C</option>
            <option value="Sala D">Sala D</option>
            <option value="Laboratório A">Laboratório A</option>
            <option value="Laboratório B">Laboratório B</option>
            <option value="Laboratório C">Laboratório C</option>
            <option value="Laboratório D">Laboratório D</option>`
        break;
        case "Bloco C":
            selectLocal.innerHTML = `
            <option value="Corredores">Corredores</option>
            <option value="Banheiro Feminino">Banheiro Feminino</option>
            <option value="Banheiro Masculino">Banheiro Masculino</option>
            <option value="Sala A">Sala A</option>
            <option value="Sala B">Sala B</option>
            <option value="Sala C">Sala C</option>
            <option value="Sala D">Sala D</option>
            <option value="Laboratório A">Laboratório A</option>
            <option value="Laboratório B">Laboratório B</option>
            <option value="Laboratório C">Laboratório C</option>
            <option value="Laboratório D">Laboratório D</option>`
        break;
        case "Auditório":
            selectLocal.innerHTML = `
            <option value="Auditório">Auditório</option>
            <option value="Palco">Palco</option>
            <option value="Plateia">Plateia</option>
            <option value="Bastidores">Bastidores</option>
            <option value="Entrada">Entrada</option>`
        break;
        case "Pátio":
            selectLocal.innerHTML = `
            <option value="Pátio">Pátio</option>
            <option value="Entrada">Entrada</option>
            <option value="Mesas">Mesas</option>
            <option value="Banheiro Feminino">Banheiro Feminino</option>
            <option value="Banheiro Masculino">Banheiro Masculino</option>
            <option value="Cantina">Cantina</option>
            <option value="Brinquedos">Brinquedos</option>`
        break;
        Pátio
        default:
            selectLocal.innerHTML += ``

    };
};

window.formDTI = async function() {
    var predio = document.getElementById('predio').value;
    var local = document.getElementById('local').value;
    var problema = document.getElementById('problema').value;
    var prioridade = document.getElementById('prioridade').value;
    var descricao = document.getElementById('descricao').value;
    var img = document.getElementById('img').value;
    
    if (predio !== "" && local !== "" && problema !== "" && prioridade !== ""){
    
        try {
            const docRef = await addDoc(collection(db, "chamados"), {
                tipo: "DTI",
                user: uid,
                nome: displayName,
                email: email,
                predio: predio,
                local: local,
                problema: problema,
                prioridade: prioridade,
                descricao: descricao,
                status: "pendente",
                created_at: serverTimestamp(),
                updated_at: ""
            });
            console.log("Document written with ID: ", docRef.id);
    
            if(img !== ""){

                var chamadosRef = ref(storage, 'chamados/images/'+ docRef.id);
                const metadata = {
                    contentType: 'image/jpeg',
                };

                uploadBytes(chamadosRef, img, metadata).then((snapshot) => {
                    
                    console.log('Uploaded a blob or file!');
                });
            }else{
                chamadosRef = null;
            }
                
                //Captura dos elementos do Modal Pop-up na página
            var element = document.getElementById('popup');
            var title = document.getElementById('popup-title');
            var text = document.getElementById('popup-text');

            // Geração do Modal Pop-up na Página
            
            title.innerHTML = `<h1>Chamado efetuado com sucesso!<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Seu chamado foi registrado e enviado ao suporte, agora só aguardar pela manutenção ou caso queira, acompanhe na sessão "Chamados". Obrigado por usar nosso Sistema! :)</p><p>Documento criado com ID: ${docRef.id}</p>`;
                

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })
    
        } catch (e) {
            console.error("Error adding document: ", e);

            //Captura dos elementos do Modal Pop-up na página
            var element = document.getElementById('popup');
            var title = document.getElementById('popup-title');
            var text = document.getElementById('popup-text');

            // Geração do Modal Pop-up na Página
            
            title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Por favor, tente novamente ou caso o erro persista comunique a coordenação escolar.</p><p>Erro: ${e}</p>`;
                

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })
        }
    }else{
        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        // Geração do Modal Pop-up na Página
        
        title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
        text.innerHTML = `<p>Por favor preencha todos os dados.</p>`;
            

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

        })
    }
}

window.formPredial = async function() {
    var predio = document.getElementById('predio').value;
    var local = document.getElementById('local').value;
    var problema = document.getElementById('problema').value;
    var prioridade = document.getElementById('prioridade').value;
    var descricao = document.getElementById('descricao').value;
    var img = document.getElementById('img').value;

    if (predio !== "" && local !== "" && problema !== "" && prioridade !== ""){

        try {
            const docRef = await addDoc(collection(db, "chamados"), {
                tipo: "PREDIAL",
                user: uid,
                nome: displayName,
                email: email,
                predio: predio,
                local: local,
                problema: problema,
                prioridade: prioridade,
                descricao: descricao,
                status: "pendente",
                created_at: serverTimestamp(),
                updated_at: ""
            });
            console.log("Document written with ID: ", docRef.id);
            
            if(img !== ""){

                var chamadosRef = ref(storage, 'chamados/images/'+ docRef.id);
                const metadata = {
                    contentType: 'image/jpeg',
                };

                uploadBytes(chamadosRef, img, metadata).then((snapshot) => {
                    
                    console.log('Uploaded a blob or file!');
                });
            }else{
                chamadosRef = null;
            }

            //Captura dos elementos do Modal Pop-up na página
            var element = document.getElementById('popup');
            var title = document.getElementById('popup-title');
            var text = document.getElementById('popup-text');

            // Geração do Modal Pop-up na Página
            
            title.innerHTML = `<h1>Chamado efetuado com sucesso!<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Seu chamado foi registrado e enviado ao suporte, agora só aguardar pela manutenção ou caso queira, acompanhe na sessão "Chamados". Obrigado por usar nosso Sistema! :)</p><p>Documento criado com ID: ${docRef.id}</p>`;
                

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })
            
        } catch (e) {
            console.error("Error adding document: ", e);

            //Captura dos elementos do Modal Pop-up na página
            var element = document.getElementById('popup');
            var title = document.getElementById('popup-title');
            var text = document.getElementById('popup-text');

            // Geração do Modal Pop-up na Página
            
            title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Por favor, tente novamente ou caso o erro persista comunique a coordenação escolar.</p><p>Erro: ${e}</p>`;
                

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })
        }
    }else{
        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        // Geração do Modal Pop-up na Página
        
        title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
        text.innerHTML = `<p>Por favor preencha todos os dados.</p>`;
            

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

        })
    }
}
 
window.formOcorrencias = async function() {
    var predio = document.getElementById('predio').value;
    var local = document.getElementById('local').value;
    var tipo = document.getElementById('tipo').value;
    var prioridade = document.getElementById('prioridade').value;
    var titulo = document.getElementById('titulo').value;
    var descricao = document.getElementById('descricao').value;
    var img = document.getElementById('img').value;
    
    if (predio !== "" && local !== "" && tipo !== "" && prioridade !== "" && titulo !== "" && descricao !== ""){
        try {
            const docRef = await addDoc(collection(db, "ocorrencias"), {
                tipo: tipo,
                user: uid,
                nome: displayName,
                email: email,
                predio: predio,
                local: local,
                prioridade: prioridade,
                titulo: titulo,
                descricao: descricao,
                status: "pendente",
                created_at: serverTimestamp(),
                updated_at: ""
            });
            console.log("Document written with ID: ", docRef.id);

            if(img !== ""){

                var ocorrenciasRef = ref(storage, 'ocorrencias/images/'+ docRef.id);
                const metadata = {
                    contentType: 'image/jpeg',
                };

                uploadBytes(ocorrenciasRef, img, metadata).then((snapshot) => {
                    
                    console.log('Uploaded a blob or file!');
                });
            }else{
                ocorrenciasRef = null;
            }

            //Captura dos elementos do Modal Pop-up na página
            var element = document.getElementById('popup');
            var title = document.getElementById('popup-title');
            var text = document.getElementById('popup-text');

            // Geração do Modal Pop-up na Página
            
            title.innerHTML = `<h1>Ocorrência efetuada com sucesso!<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Sua ocorrência foi registrada e enviada. Obrigado por usar nosso Sistema! :)</p><p>Documento criado com ID: ${docRef.id}</p>`;
                

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })

        } catch (e) {
            console.error("Error adding document: ", e);
            //Captura dos elementos do Modal Pop-up na página
            var element = document.getElementById('popup');
            var title = document.getElementById('popup-title');
            var text = document.getElementById('popup-text');

            // Geração do Modal Pop-up na Página
            
            title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Por favor, tente novamente ou caso o erro persista comunique a coordenação escolar.</p><p>Erro: ${e}</p>`;
                

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })
        }
    }else{
        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        // Geração do Modal Pop-up na Página
        
        title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
        text.innerHTML = `<p>Por favor preencha todos os dados.</p>`;
            

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

        })
    }
 }

if(buttonDTI){
    buttonDTI.addEventListener('click', function() {
        
        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');
        
        // Geração do Modal Pop-up na Página
        title.innerHTML = `<h1>Aguarde</h1>`;
        text.innerHTML = `<div class="spinner-border text-info" role="status"></div>`;
        
        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        window.formDTI();
    })
}
if(buttonPredial){
    buttonPredial.addEventListener('click', function() {

        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');
        
        // Geração do Modal Pop-up na Página
        title.innerHTML = `<h1>Aguarde</h1>`;
        text.innerHTML = `<div class="spinner-border text-info" role="status"></div>`;
        
        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        window.formPredial();
    })
}
if(buttonOcorrencias){
    buttonOcorrencias.addEventListener('click', function() {

        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');
        
        // Geração do Modal Pop-up na Página
        title.innerHTML = `<h1>Aguarde</h1>`;
        text.innerHTML = `<div class="spinner-border text-info" role="status"></div>`;
        
        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        window.formOcorrencias();
    })
}

//--------------------------------------------Função fecha Modal Pop-up-----------------------------------------------------
function hideModal(){
    var element = document.getElementById('popup');
    element.classList.remove('show-popup');
};