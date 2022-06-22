//---------------------------------------Declarações e importações para o código-----------------------------------------------------------
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, updateProfile, sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import {getFirestore, setDoc, doc, serverTimestamp, query, collection, where, onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {app} from "./app.js";

const auth = getAuth();
const db = getFirestore(app);

export {auth};

setPersistence(auth, browserSessionPersistence);

//-----------------------------------Declaração dos botões para acionamento das funções-----------------------------------------------------
var btnEntrar = document.getElementById('btnentrar');
var btnCadastrar = document.getElementById('btncadastrar');

//--------------------------------------------Função para efetuar a verificação de login-----------------------------------------------------
window.login = async function() {

    //Captura dos dados nos campos do formulário
    var inEmail = document.getElementById('inemail').value;
    var inPass = document.getElementById('inpass').value;

    //Função do Firebase Auth para autenticar dados
    signInWithEmailAndPassword(auth, inEmail, inPass).then((userCredential) => {

        //Retorno de Usuário Autenticado
        const user = userCredential.user;

        hideModal();

        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        //Geração do Modal Pop-up na Página
        title.innerHTML = `<h1>Acesso permitido.<span class="close" id="close-button">&times;</span></h1>`;
        if(user.displayName !== null){

            text.innerHTML = `<p>Olá ${user.displayName},  seja bem vindo ao S.M.O!</p>`;
        }else{
            text.innerHTML = `<p>Olá ${user.email},  seja bem vindo ao S.M.O!</p>`;
        }

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

            //Redirecionamento para aplicação
            const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));
    
            //Verificação para o redirecionamento
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().admin == "true"){
                        window.location.replace("/menu-admin");
                    }else{
                        window.location.replace("/menu-usuario");    
                    }
                })
            })
        })
    })
    //Função de tratamento de erro.
    .catch((error) => {

        //Variavel com retorno do erro
        const errorCode = error.code;

        hideModal();

        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        //Estrutura de decisão do erro para geração do Modal Pop-up na Página
        switch(errorCode){
            case "auth/invalid-email":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique suas informações e tente novamente.</p>`;
            break;
            case "auth/internal-error":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique suas informações e tente novamente.</p>`;
            break;
            case "auth/wrong-password":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique sua senha e tente novamente.</p>`;
            break;
            case "auth/user-not-found":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique seu email e tente novamente.</p>`;
            break;
            case "auth/network-request-failed":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique sua conexão com a internet e tente novamente.</p>`;
            break;
            default:
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique seus dados e sua conexão e tente novamente. Se o erro persistir, tente novamente mais tarde ou notifique a coordenação escolar..</p>`;
            
        }

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();
            });
            //const errorMessage = error.message;
    });
}

//--------------------------------------------Função para efetuar o cadastro de usuario-----------------------------------------------------
window.register = async function() {

    //Captura dos dados nos campos do formulário
    var upEmail = document.getElementById('upemail').value;
    var upPass = document.getElementById('uppass').value;

    //Função do Firebase Auth para cadastrar usuario
    createUserWithEmailAndPassword(auth, upEmail, upPass).then((userCredential) => {

        //Retorno de usuario criado e logado
        const user = userCredential.user;

        //Criação das informações do usuário no banco de dados
        setDoc(doc(db, "usuarios", user.uid), {
            created_at: serverTimestamp(),
            updated_at: "",
            nome: "",
            email: user.email,
            curso: "",
            modulo: "",
            curso2: "",
            admin : "false",
            uid: user.uid
          });

          hideModal();

        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        //Geração do Modal Pop-up na Página
        title.innerHTML = `<h1>Cadastro realizado.<span class="close" id="close-button">&times;</span></h1>`;
        if(user.displayName !== null){

            text.innerHTML = `<p>Olá ${user.displayName},  seja bem vindo ao S.M.O!</p>`;
        }else{
            text.innerHTML = `<p>Olá ${user.email},  seja bem vindo ao S.M.O!</p>`;
        }

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

            //Redirecionamento para aplicação
            window.location.replace("/menu-usuario");

        });
    })
    //Função de tratamento de erro.
    .catch((error) => {

        //Variavel com retorno do erro
        const errorCode = error.code;

        hideModal();

        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        //Estrutura de decisão do erro para geração do Modal Pop-up na Página
        switch(errorCode){
            case "auth/invalid-email"://
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique suas informações e tente novamente.</p>`;
            break;
            case "auth/internal-error"://
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique suas informações e tente novamente.</p>`;
            break;
            case "auth/missing-email":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique o email e tente novamente.</p>`;
            break;
            case "auth/weak-password":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, use uma senha mais forte (acima de 5 digitos) e tente novamente.</p>`;
            break;
            case "auth/email-already-in-use":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>O email inserido já está cadastrado, verifique se ele está correto ou caso seja seu e não tenha acesso, clique em recuperar acesso.</p>`;
            break;
            case "auth/network-request-failed":
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique sua conexão com a internet e tente novamente.</p>`;
            break;
            default:
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Por favor, verifique seus dados e sua conexão e tente novamente. Se o erro persistir, tente novamente mais tarde ou notifique a coordenação escolar.. ${errorCode}</p>`;
            
        }

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

        });
        //const errorMessage = error.message;
    });
};

//--------------------------------------------Eventos dos botões de envio dos formulários-----------------------------------------------------

//Evento do botão de login
if(btnEntrar){
    btnEntrar.addEventListener('click', function() {
        window.login();
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        title.innerHTML = `<h1>Enviando..<span class="close" id="close-button">&times;</span></h1>`;
        text.innerHTML = `<div class="spinner-border text-info" role="status"></div>`;

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

        })
    });
};

//Evento do botão de Cadastro
if(btnCadastrar){
    btnCadastrar.addEventListener('click', function() {

        //Meio verificador de senha
        var upPass = document.getElementById('uppass').value;
        var reUpPass = document.getElementById('reuppass').value;

        //Comparador dos campos de senha
        if ( upPass == reUpPass){

            var upEmail = document.getElementById('upemail').value;
            var dominio = upEmail.substr(upEmail.length-14, 14);
            if(dominio == "etec.sp.gov.br"){
                console.log(dominio);    
                //Retorno verificado para função    
                window.register();
                var element = document.getElementById('popup');
                var title = document.getElementById('popup-title');
                var text = document.getElementById('popup-text');

                title.innerHTML = `<h1>Enviando..<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<div class="spinner-border text-info" role="status"></div>`;

                //Renderizando o pop-up na página
                element.classList.add('show-popup');

                //Captura do botão de fechamento do pop-up
                var close = document.getElementById('close-button');
                
                //Evento para fechar o pop-up e redirecionar para aplicação
                close.addEventListener('click', function() {

                    //Função para fechar pop-up
                    hideModal();

                })
            }else{
                //Retorno inválido do email
                console.log(dominio);
                //Captura dos elementos do Modal Pop-up na página
                var element = document.getElementById('popup');
                var title = document.getElementById('popup-title');
                var text = document.getElementById('popup-text');

                // Geração do Modal Pop-up na Página
                
                title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
                text.innerHTML = `<p>Utilize seu email institucional para cadastro. Caso tenha inserido ele, por favor verifique e tente novamente.</p>`;
                    

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
        else{
            //Retorno inválido das senhas
            
            //Captura dos elementos do Modal Pop-up na página
            var element = document.getElementById('popup');
            var title = document.getElementById('popup-title');
            var text = document.getElementById('popup-text');

            // Geração do Modal Pop-up na Página
            
            title.innerHTML = `<h1>Ocorreu um erro:<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>As senhas não se coincidem, por favor verifique.</p>`;
                

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })
        };
    });
};

//--------------------------------------------Função fecha Modal Pop-up-----------------------------------------------------
function hideModal(){
    var element = document.getElementById('popup');
    element.classList.remove('show-popup');
};


//--------------------------------------------Função Redefinir Senha-----------------------------------------------------
window.redefinirSenha = async function() {
    
    //Captura dos elementos do Modal Pop-up na página
    var element = document.getElementById('popup');
    var title = document.getElementById('popup-title');
    var text = document.getElementById('popup-text');

    // Geração do Modal Pop-up na Página
    
    title.innerHTML = `<h1>Recuperar Acesso<span class="close" id="close-button">&times;</span></h1>`;
    text.innerHTML = `<p>Por favor, informe o email de seu login.</p>
    <p>Será enviado um email para a redefinição de sua senha para o email informado.</p>
    <input type="email" id="emailSenha">
    <button id="enviarEmail" onclick="window.enviarEmail()">Enviar</button>`;
        

    //Renderizando o pop-up na página
    element.classList.add('show-popup');

    //Captura do botão de fechamento do pop-up
    var close = document.getElementById('close-button');
    
    //Evento para fechar o pop-up e redirecionar para aplicação
    close.addEventListener('click', function() {

        //Função para fechar pop-up
        hideModal();

    })
    window.enviarEmail = async function(){
        hideModal();
        //Captura dos elementos do Modal Pop-up na página
        var element = document.getElementById('popup');
        var title = document.getElementById('popup-title');
        var text = document.getElementById('popup-text');

        var email = document.getElementById("emailSenha").value;
        var dominio = email.substr(email.length-14, 14);

        if (email == "" || dominio !== "etec.sp.gov.br" ){
            title.innerHTML = `<h1>Enviando..<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Email inválido.</p>`;
        }else{
            title.innerHTML = `<h1>Enviando..<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<div class="spinner-border text-info" role="status"></div>`;
        }

        //Renderizando o pop-up na página
        element.classList.add('show-popup');

        //Captura do botão de fechamento do pop-up
        var close = document.getElementById('close-button');
        
        //Evento para fechar o pop-up e redirecionar para aplicação
        close.addEventListener('click', function() {

            //Função para fechar pop-up
            hideModal();

        })
        
        sendPasswordResetEmail(auth, email)
        .then(() => {
            hideModal();
            // Geração do Modal Pop-up na Página
        
            title.innerHTML = `<h1>Enviado!<span class="close" id="close-button">&times;</span></h1>`;
            text.innerHTML = `<p>Seu email foi enviado, por favor verifique sua caixa de entrada.</p>`;

            //Renderizando o pop-up na página
            element.classList.add('show-popup');

            //Captura do botão de fechamento do pop-up
            var close = document.getElementById('close-button');
            
            //Evento para fechar o pop-up e redirecionar para aplicação
            close.addEventListener('click', function() {

                //Função para fechar pop-up
                hideModal();

            })
        }).catch((error) => {
            hideModal();
            //fazer switch para tratamento de erro
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
        });
    }
}

/*
//Modal
var close = document.getElementById('close-button');
close.addEventListener('click', function() {
    hideModal();
});

    var element = document.getElementById('popup');
    element.classList.add('show-popup');


function hideModal(){
    var element = document.getElementById('popup');
    element.classList.remove('show-popup');
}
*/