import '../css/03-feedback.css';
import '../css/common.css';
import throttle from 'lodash.throttle';

const CONTACT_FORM_LOCAL_STORAGE_KEY = 'formData';
const contactFormEl = document.querySelector('.feedback-form');
const formData = {};

const onClearFormData = form => {
  const formDataEl = JSON.parse(localStorage.getItem(CONTACT_FORM_LOCAL_STORAGE_KEY));

  const formEl = form.elements;

  for (const key in formDataEl) {
    if (formDataEl.hasOwnProperty(key)) {
      contactFormEl[key].value = formDataEl[key];
    }
  }
};

onClearFormData(contactFormEl);

const onElementFocusChange = throttle(event => {
  const target = event.target.value;

  const elName = event.target.name;

  formData[elName] = target;

  localStorage.setItem(CONTACT_FORM_LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);

const onFormSubmit = event => {
  event.preventDefault();

  if (event.target.message.value === '' || event.target.email.value === '') {
    alert('нужно заполнить все поля');
    return;
  }

  const inputsEl = {
    email: contactFormEl.email.value,
    message: contactFormEl.message.value,
  };

  console.log(inputsEl);

  localStorage.removeItem(CONTACT_FORM_LOCAL_STORAGE_KEY);

  event.target.reset();
};

contactFormEl.addEventListener('input', onElementFocusChange);

contactFormEl.addEventListener('submit', onFormSubmit);
