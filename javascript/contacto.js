let form = document.getElementById("formulario");
let textInputs = document.querySelectorAll("input[type=text], input[type=email], textarea");
let checkboxes = document.querySelectorAll("input[type=checkbox]");
let btnEnviar = document.getElementById("boton-enviar");
let btnEnviado = document.getElementById("boton-enviado");

form.addEventListener("submit", (e)=>cartelitoEnviado(e));

function cartelitoEnviado(event){
    event.preventDefault();
    btnEnviar.classList.add('ocultar-boton');
    btnEnviado.classList.remove('ocultar-boton');
    textInputs.forEach(input => input.value="");
    checkboxes.forEach(checkbox => checkbox.checked=false);
}