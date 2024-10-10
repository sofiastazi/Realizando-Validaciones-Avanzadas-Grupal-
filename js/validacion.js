// El formulario deberá enviarse solamente si cumple con los criterios definidos:

// Ningún campo puede estar vacío
// El Email debe tener un formato valido
// La contraseña debe tener al menos 6 caracteres
// Los datos ingresados en "Contraseña" y "Repetir contraseña" deben ser iguales
// Se debe haber marcado el checkbox "Acepto los términos y condiciones del servicio" (en este caso dentro de un modal).

// Deberá dar feedback al usuario cumpliendo con los siguientes criterios:

// Solamente se dará feedback al usuario, luego de que se intente ejecutar el submit, momento en el que se deberá mostrar el resultado de la validación para todos los campos.
// Luego de ese momento, el feedback deberá funcionar en tiempo real para todos los casos.
// Para cada caso, deberá alertarse al menos a través de un aviso que especifique la omisión y del color del borde del campo.
// El campo "Repetir contraseña" solo se validará cuando se cumpla que su valor sea igual al del campo "Contraseña" y que el campo "Contraseña" se encuentre validado. Por lo que se mostrará como invalido mientras no se valide "Contraseña", aún cumpliéndose la igualdad.
// El checkbox de los terminos y condiciones deberá dar feedback en 3 lugares:
// - El mismo checkbox, dentro del modal
// - El botón que despliega el modal
// - Un texto al lado del mismo botón


document.addEventListener('DOMContentLoaded', function () {
    
    // Seleccionamos el formulario y los elementos necesarios para la validación
    const form = document.querySelector('form');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const terminos = document.getElementById('terminos');
    const modalButton = document.querySelector('[data-bs-toggle="modal"]');
    
    // Creamos un elemento de texto para mostrar el feedback al lado del botón del modal
    const feedbackText = document.createElement('span');
    feedbackText.classList.add('ms-2');  // Añadimos un margen a la izquierda
    modalButton.parentNode.insertBefore(feedbackText, modalButton.nextSibling);  // Insertamos el span después del botón
    
    // Desactivamos la validación nativa del navegador
    form.setAttribute('novalidate', true);
  
    // Validación al enviar el formulario
    form.addEventListener('submit', function (event) {
        // Si el formulario no es válido o el checkbox de términos no está marcado
        if (!form.checkValidity() || !terminos.checked) {
            event.preventDefault();  // Previene el envío del formulario
            event.stopPropagation();  // Detiene la propagación del evento
        }
  
        // Añadimos la clase 'was-validated' para activar el feedback visual de Bootstrap
        if (terminos.checked) {
            terminos.classList.add('is-valid');  // Añadimos clase para feedback positivo
            terminos.classList.remove('is-invalid');  // Quitamos clase de error
            modalButton.classList.add('btn-success');  // Cambiamos el botón a un estilo de éxito
            modalButton.classList.remove('btn-danger');  // Quitamos el estilo de error
            feedbackText.textContent = "Términos aceptados";  // Mostramos un mensaje positivo
            feedbackText.classList.add('text-success');  // Añadimos clase de éxito
            feedbackText.classList.remove('text-danger');  // Quitamos clase de error
        } else {
            // Si el checkbox no está marcado
            terminos.classList.add('is-invalid');  // Añadimos clase de error
            terminos.classList.remove('is-valid');  // Quitamos clase de feedback positivo
            modalButton.classList.add('btn-danger');  // Cambiamos el botón a un estilo de error
            modalButton.classList.remove('btn-success');  // Quitamos el estilo de éxito
            feedbackText.textContent = "Debe aceptar los términos";  // Mostramos un mensaje de error
            feedbackText.classList.add('text-danger');  // Añadimos clase de error
            feedbackText.classList.remove('text-success');  // Quitamos clase de éxito
        }

        form.classList.add('was-validated');
    });
  
    // Agregamos eventos de entrada a los campos de contraseñas para validar en tiempo real
    password1.addEventListener('input', validarContrasenias);
    password2.addEventListener('input', validarContrasenias);
  
    // Función para validar las contraseñas
    function validarContrasenias() {
        // Verificamos que la primera contraseña no esté vacía y tenga al menos 6 caracteres
        if (password1.value !== '' && password1.value.length >= 6) {
            password1.setCustomValidity('');  // Limpiamos el mensaje de error personalizado
            password1.classList.add('is-valid');  // Añadimos clase para feedback positivo
            password1.classList.remove('is-invalid');  // Quitamos clase de error

            // Validamos si ambas contraseñas coinciden
            if (password1.value === password2.value) {
                password2.setCustomValidity('');  // Limpiamos el mensaje de error personalizado
                password2.classList.add('is-valid');  // Añadimos clase para feedback positivo
                password2.classList.remove('is-invalid');  // Quitamos clase de error
            } else {
                // Si las contraseñas no coinciden, mostramos un mensaje de error
                password2.setCustomValidity('Las contraseñas no coinciden');
                password2.classList.add('is-invalid');  // Añadimos clase de error
                password2.classList.remove('is-valid');  // Quitamos clase de feedback positivo
            }
        } else {
            // Si la primera contraseña no cumple los requisitos, mostramos un mensaje de error
            password1.setCustomValidity('La contraseña debe tener al menos 6 caracteres');
            password1.classList.add('is-invalid');  // Añadimos clase de error
            password1.classList.remove('is-valid');  // Quitamos clase de feedback positivo
        }
    }
})
