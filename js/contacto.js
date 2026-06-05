document.addEventListener('DOMContentLoaded', function () {
    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email');
    var btnEnviar = document.getElementById('btnEnviar');
    var mensaje = document.getElementById('mensaje');

    nombre.addEventListener('input', validarNombre);
    email.addEventListener('input', validarEmail);
    mensaje.addEventListener('input', validarMensaje);
    btnEnviar.addEventListener('click', validarTodo);
    
});

function validarNombre() {
    if (nombre.value === '' || (!/^[a-zA-Z]+$/.test(nombre.value))) {
        nombre.style.borderColor = 'red';
        return false;
    } else {
        nombre.style.borderColor = 'lime';
        return true;
    }
}
function validarEmail() {
    var valor = email.value;
    if (valor.indexOf('@') === -1 || valor.indexOf('.') === -1) {
        email.style.borderColor = 'red';
        return false;
    } else {
        email.style.borderColor = 'lime';
        return true;
    }
}
function validarMensaje(){
    if(mensaje.value ===''){
        mensaje.style.borderColor = 'red';
        return false;
    }else {
        mensaje.style.borderColor = 'lime';
        return true;
    }
}
function validarTodo() {
    if (validarNombre() && validarEmail() && validarMensaje()) {
        alert('Formulario enviado correctamente!');
    } else {
        if(!validarNombre()){
            alert('Escriba el nombre correctamente!');
        }else{
            if(!validarEmail()){
                alert('Escriba el email correctamente!');
            }
            else{
                alert('Escriba el mensaje correctamente!');
            }
        }
        
    }
    
}