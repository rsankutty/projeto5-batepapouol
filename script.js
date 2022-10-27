let name = prompt("Seu lindo nome");
console.log(name);

function enterEvent(event) {
  if (event.keyCode == 13) {
    clearInput();
 }
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