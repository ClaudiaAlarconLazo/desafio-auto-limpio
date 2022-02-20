const SUPABASE_URL = 'https://lwuduvlhohzpawjggsdz.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgzOTIxMCwiZXhwIjoxOTU5NDE1MjEwfQ.mOypMz22Avy9RyKDho-BjMwgYBQBd6Uspy1BvEyG5Js";

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)


//Función para registrar servicio de lavado
function addCarWash(event) {
  event.preventDefault();

  const form = document.querySelector('form');
  const data = Object.fromEntries(new FormData(form).entries());

  const isValidRut = validationInputRut();
  const isValidName = validationInputName();
  const isValidLastName = validationInputLastName();
  const isValidAddress = validationInputAddress();
  const isValidState = validationSelectState();
  const isValidTransport = validationSelectTransport();
  const isValidBrand = validationInputBrand();
  const isValidModel = validationInputModel();
  const isValidYear = validationInputYear();
  const isValidReview = validationRadioButton();
  const isValidService = validationCheckbox();
  const isValidManager = validationSelectManager();
  const isValidScheduleDate = validationInputScheduleDate();
  const isValidScheduleTime = validationSelectScheduleTime();
  const totalAmount = getAmount();

  if (!isValidRut || !isValidName || !isValidLastName || !isValidAddress || !isValidState || !isValidTransport || !isValidBrand || !isValidModel || !isValidYear || !isValidReview || !isValidService || !isValidManager || !isValidScheduleDate || !isValidScheduleTime) {
    return
  }

  supabase.from('car_wash')
  .insert([
    {
    rut: data.rut,
    name: data.name,
    last_name: data.last-name,
    transport: data.transport,
    brand: data.brand,
    model: data.model,
    year: data.year,
    total_amount: totalAmount,
    manager: data.manager,
   },
  ])
  .then(response => {
    alert(`${data.name} su lavado ha sido reservado. El valor del servicio es $${totalAmount}`);
    window.location.href = "index.html";
  })
  .catch(error => console.log(error));

};

function getAmount() {
  const outside = document.getElementById('outside').checked;
  const motor = document.getElementById('motor').checked;
  let amount = 0;

  if (validationCheckbox()) {
    if (outside) {
      amount = amount + 7000; 
    }

    if (motor) {
      amount = amount + 5000; 
    }

    const iva = amount * 0.19;
    const totalAmount = amount + iva;
    setInputValue(amount, iva, totalAmount);

    return totalAmount;
  }

}


function setInputValue(amount, iva, totalAmount) {
  const neto = document.getElementById('neto');
  const imp = document.getElementById('iva');
  const total = document.getElementById('total');

  neto.value = amount;
  imp.value = iva;
  total.value = totalAmount;
}

function validationInputRut() {
  const rut = document.getElementById('rut').value;
  const rutForm = document.getElementById('rut');
  const rutHelp = document.getElementById('rut-help');

  if (!rutValidation(rut)) {
    rutForm.classList.add('is-danger');
    rutHelp.classList.remove('is-hidden');
    rutHelp.innerHTML = "El RUT es inválido";
    return false;
  } else if(!requiredValidation(rut)) {
    rutForm.classList.add('is-danger');
    rutHelp.classList.remove('is-hidden');
    rutHelp.innerHTML = "El RUT es requerido";
    return false;
  } else {
    rutForm.classList.remove('is-danger');
    rutHelp.classList.add('is-hidden');
    return true;
  }
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
    return false;
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
    return false;
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
  } else if(!lengthValidation(address.length, 80)) {
    addressForm.classList.add('is-danger');
    addressHelp.classList.remove('is-hidden');
    addressHelp.innerHTML = "La dirección no puede contener más de 80 caracteres";
    return false;
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

function validationSelectTransport() {
  const transport = document.getElementById('transport').value;
  const transportForm = document.getElementById('transport-select');
  const transportHelp = document.getElementById('transport-help');

  if (!requiredValidation(transport)) {
    transportForm.classList.add('is-danger');
    transportHelp.classList.remove('is-hidden');
    transportHelp.innerHTML = "El tipo de vehículo es requerido";
    return false;
  } else {
    transportForm.classList.remove('is-danger');
    transportHelp.classList.add('is-hidden');
    return true;
  }
}

function validationInputBrand() {
  const brand = document.getElementById('brand').value;
  const brandForm = document.getElementById('brand');
  const brandHelp = document.getElementById('brand-help');

  if (!requiredValidation(brand)) {
    brandForm.classList.add('is-danger');
    brandHelp.classList.remove('is-hidden');
    brandHelp.innerHTML = "La marca es requerida";
    return false;
  } else if(!lengthValidation(brand.length, 20)) {
    brandForm.classList.add('is-danger');
    brandHelp.classList.remove('is-hidden');
    brandHelp.innerHTML = "La marca no puede contener más de 20 caracteres";
    return false;
  } else {
    brandForm.classList.remove('is-danger');
    brandHelp.classList.add('is-hidden');
    return true;
  }
}

function validationInputModel() {
  const model = document.getElementById('model').value;
  const modelForm = document.getElementById('model');
  const modelHelp = document.getElementById('model-help');

  if (!requiredValidation(model)) {
    modelForm.classList.add('is-danger');
    modelHelp.classList.remove('is-hidden');
    modelHelp.innerHTML = "El modelo es requerido";
    return false;
  } else if(!lengthValidation(model.length, 20)) {
    modelForm.classList.add('is-danger');
    modelHelp.classList.remove('is-hidden');
    modelHelp.innerHTML = "El modelo no puede contener más de 20 caracteres";
    return false;
  } else {
    modelForm.classList.remove('is-danger');
    modelHelp.classList.add('is-hidden');
    return true;
  }
}

function validationInputYear() {
  const year = document.getElementById('year').value;
  const yearForm = document.getElementById('year');
  const yearHelp = document.getElementById('year-help');

  if (!requiredValidation(year)) {
    yearForm.classList.add('is-danger');
    yearHelp.classList.remove('is-hidden');
    yearHelp.innerHTML = "El año es requerido";
    return false;
  } else if(!numberValidation(year)) {
    yearForm.classList.add('is-danger');
    yearHelp.classList.remove('is-hidden');
    yearHelp.innerHTML = "El año debe ser entre 1960 y 2022";
    return false;
  } else {
    yearForm.classList.remove('is-danger');
    yearHelp.classList.add('is-hidden');
    return true;
  }
}

function validationRadioButton() {
  const yes = document.getElementById('yes').checked;
  const yesForm = document.getElementById('yes');
  const no = document.getElementById('no').checked;
  const noForm = document.getElementById('no');
  const radioHelp = document.getElementById('radio-help');

  if (!yes && !no) {
    yesForm.classList.add('is-danger');
    noForm.classList.add('is-danger');
    radioHelp.classList.remove('is-hidden');
    radioHelp.innerHTML = "El estado de la revisión técnica es requerido";
    return false;
  } else {
    yesForm.classList.remove('is-danger');
    noForm.classList.remove('is-danger');
    radioHelp.classList.add('is-hidden');
    return true;
  }
}

function validationCheckbox() {
  const outside = document.getElementById('outside').checked;
  const outsideForm = document.getElementById('outside');
  const motor = document.getElementById('motor').checked;
  const motorForm = document.getElementById('motor');
  const ckeckboxHelp = document.getElementById('checkbox-help');

  if (!outside && !motor) {
    outsideForm.classList.add('is-danger');
    motorForm.classList.add('is-danger');
    ckeckboxHelp.classList.remove('is-hidden');
    ckeckboxHelp.innerHTML = "El tipo de lavado es requerido";
    return false;
  } else {
    outsideForm.classList.remove('is-danger');
    motorForm.classList.remove('is-danger');
    ckeckboxHelp.classList.add('is-hidden');
    return true;
  }
}

function validationSelectManager() {
  const manager = document.getElementById('manager').value;
  const managerForm = document.getElementById('manager-select');
  const managerHelp = document.getElementById('manager-help');

  if (!requiredValidation(manager)) {
    managerForm.classList.add('is-danger');
    managerHelp.classList.remove('is-hidden');
    managerHelp.innerHTML = "El encargado del servicio es requerido";
    return false;
  } else {
    managerForm.classList.remove('is-danger');
    managerHelp.classList.add('is-hidden');
    return true;
  }
}

function validationInputScheduleDate() {
  const scheduleDate = document.getElementById('schedule-date').value;
  const scheduleDateForm = document.getElementById('schedule-date');
  const scheduleDateHelp = document.getElementById('schedule-date-help');

  if (!requiredValidation(scheduleDate)) {
    scheduleDateForm.classList.add('is-danger');
    scheduleDateHelp.classList.remove('is-hidden');
    scheduleDateHelp.innerHTML = "La fecha del servicio es requerida";
    return false;
  } else {
    scheduleDateForm.classList.remove('is-danger');
    scheduleDateHelp.classList.add('is-hidden');
    return true;
  }
}

function validationSelectScheduleTime() {
  const scheduleTime = document.getElementById('schedule-time').value;
  const scheduleTimeForm = document.getElementById('schedule-time-select');
  const scheduleTimeHelp = document.getElementById('schedule-time-help');

  if (!requiredValidation(scheduleTime)) {
    scheduleTimeForm.classList.add('is-danger');
    scheduleTimeHelp.classList.remove('is-hidden');
    scheduleTimeHelp.innerHTML = "La hora del servicio es requerida";
    return false;
  } else {
    scheduleTimeForm.classList.remove('is-danger');
    scheduleTimeHelp.classList.add('is-hidden');
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
function lengthValidation(length, value) {

  if (length > value) {
    return false;
  }
  return true;
}

//Función para validar el número de un input
function numberValidation(number) {

  if (number < 1960 || number > 2022) {
    return false;
  }
  return true;
}

//Función para validar rut con expresión regular
function rutValidation(rut) {
  if (rut !== '') {
    const regExpRut = new RegExp("^[0-9]{8,9}[-|‐]{1}[0-9kK]{1}$");

    const validation = regExpRut.test(rut);

    return validation;
  }
  return true;
}
