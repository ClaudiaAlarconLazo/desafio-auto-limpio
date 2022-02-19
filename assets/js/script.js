
//Función para registrar servicio de lavado
function addCarWash(event) {
  event.preventDefault();
  console.log(event);


}

function getValue() {

}

function validationInputName() {
  const name = document.getElementById('name').value;
  const nameForm = document.getElementById('name');
  const nameHelp = document.getElementById('name-help');

  if (!requiredValidation(name)) {
    nameForm.classList.add('is-danger');
    nameHelp.classList.remove('is-hidden');
    nameHelp.innerHTML = "El nombre es requerido";
    return false;
  } else if(!lengthValidation(name.length, 30)) {
    nameForm.classList.add('is-danger');
    nameHelp.classList.remove('is-hidden');
    nameHelp.innerHTML = "El nombre no puede contener más de 30 caracteres";
  } else {
    nameForm.classList.remove('is-danger');
    nameHelp.classList.add('is-hidden');
    return true;
  }
}

function validationInputLastName() {
  const lastName = document.getElementById('last-name').value;
  const lastNameForm = document.getElementById('last-name');
  const lastNameHelp = document.getElementById('last-name-help');

  if (!requiredValidation(lastName)) {
    lastNameForm.classList.add('is-danger');
    lastNameHelp.classList.remove('is-hidden');
    lastNameHelp.innerHTML = "El apellido es requerido";
    return false;
  } else if(!lengthValidation(lastName.length, 30)) {
    lastNameForm.classList.add('is-danger');
    lastNameHelp.classList.remove('is-hidden');
    lastNameHelp.innerHTML = "El apellido no puede contener más de 30 caracteres";
  } else {
    lastNameForm.classList.remove('is-danger');
    lastNameHelp.classList.add('is-hidden');
    return true;
  }
}

function validationInputAddress() {
  const address = document.getElementById('address').value;
  const addressForm = document.getElementById('address');
  const addressHelp = document.getElementById('address-help');

  if (!requiredValidation(address)) {
    addressForm.classList.add('is-danger');
    addressHelp.classList.remove('is-hidden');
    addressHelp.innerHTML = "La dirección es requerida";
    return false;
  } else if(!lengthValidation(address.length, 30)) {
    addressForm.classList.add('is-danger');
    addressHelp.classList.remove('is-hidden');
    addressHelp.innerHTML = "La dirección no puede contener más de 30 caracteres";
  } else {
    addressForm.classList.remove('is-danger');
    addressHelp.classList.add('is-hidden');
    return true;
  }
}

function validationSelectState() {
  const state = document.getElementById('state').value;
  const stateForm = document.getElementById('state-select');
  const stateHelp = document.getElementById('state-help');

  if (!requiredValidation(state)) {
    stateForm.classList.add('is-danger');
    stateHelp.classList.remove('is-hidden');
    stateHelp.innerHTML = "La comuna es requerida";
    return false;
  } else {
    stateForm.classList.remove('is-danger');
    stateHelp.classList.add('is-hidden');
    return true;
  }
}

//Función para validar el contenido vacío de un input
function requiredValidation(value) {
  if (value === '' || value === undefined || value === null || value.length === 0) {
    return false;
  }
  return true;
}

//Función para validar la extensión de un input
function lengthValidation(lenght, value) {

  if (lenght > value) {
    return false;
  }
  return true;
}