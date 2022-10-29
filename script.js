let nome;
let objeto;

function pedirNome(){
  nome = prompt("Seu lindo nome");
  objeto = {
    name: nome
  }
}

pedirNome()
usuarioEntrou()

function usuarioEntrou(){
  const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', objeto);
  requisicao.then(tratarSucesso);
  requisicao.catch(tratarError);
}

function conectado(){
  const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', objeto);
  requisicao.then(tratarSucesso);
  requisicao.catch(tratarError);
}

function tratarSucesso(){
  getPromise();
}
setInterval(conectado, 5000);
setInterval(getPromise, 3000);

function tratarError(erro){
  alert("Este nome já está em uso, por favor insira um diferente");
  let error_status = erro.response.status;
  if (error_status !=200){
    pedirNome();
    usuarioEntrou();
  }
}

function tratarError2(erro){
  alert("Este nome já está em uso, por favor insira um diferente");
  let error_status = erro.response.status;
  if (error_status !=200){
    window.location.reload();
  }
}

function enterEvent(event) {
  if (event.keyCode == 13) {
    enviarMensagem();
    clearInput();
 }
}

function enviarMensagem(){
  let mensagem = document.querySelector("input");
  let text = mensagem.value;
  let mensagem_usuario = {
    from: nome,
    to: "Todos",
    text: text,
    type: "message"
  }
  const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem_usuario);
  requisicao.then(tratarSucesso);
  requisicao.catch(tratarError2);
}

function clearInput(){
  var getValue= document.getElementById("message");
    if (getValue.value !="") {
        getValue.value = "";
    }
}

function sendClick(){
  clearInput();
}

function getPromise(){
  const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promessa.then(processarResposta);
}


function processarResposta(resposta) {
  let dados =  resposta.data;
  const mensagens = document.querySelector(".messages");
  mensagens.innerHTML="";
  for (let i=0; i<dados.length; i++){
    let from = dados[i].from;
    let to = dados[i].to; 
    let text = dados[i].text;
    let type = dados[i].type; 
    let time = dados[i].time;
    renderizarMensagem(from,to,text,type,time);
  }
  let all_divs = document.querySelector('.messages').querySelectorAll("div");
  let last_index = all_divs.length - 1;
  let last_element = all_divs[last_index];
  last_element.scrollIntoView();
}

function renderizarMensagem(from,to,text,type,time){
  if (type == "status") {
    elemento = `
    <div class="message-inout">
    <span class="time">(${time}})</span> <strong>${from}</strong> ${text}
    </div>`;
  } else if (type == "private_message" && nome == to) {
    elemento = `
    <div class="message-secret">
    <span class="time">(${time}})</span> <strong>${from}</strong> reservadamente para <strong>${to}</strong>: ${text}
    </div>`;
  } else {
    elemento = `
    <div class="message-box">
      <span class="time">(${time}})</span> <strong>${from}</strong> para <strong>${to}</strong>: ${text}
    </div>`;
  }
  const mensagens = document.querySelector(".messages");
  mensagens.innerHTML += elemento;
}

