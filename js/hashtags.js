import {sendRequest } from './serverWork.js';
import {showAlert} from './utils.js';
import { isEscape } from './utils.js';
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;


const form = document.querySelector('.img-upload__form');
const button = document.querySelector('.img-upload__submit');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const newFragment = document.createDocumentFragment();
const mes = document.querySelector('.message');


const pristine = new Pristine(form, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item-invalid',
  successClass: 'img-upload__item-valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const hashtags = document.querySelector('.text__hashtags');

let errorMessages = '';
const error = () => errorMessages;

const hashtagsHandler = (value) => {
  errorMessages = '';
  const text = value.toLowerCase().trim();
  if (!text){
    return true;
  }

  const input = text.split(/\s+/);

  if(input.legth === 0){
    return true;
  }

  const rules = [
    {
      check: input.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: input.some((item) => item[0] !=='#'),
      error: 'Хэш-тек должен начинается с #',
    },
    {
      check: input.some((item, num, arr) => arr.includes(item, num +1)),
      error: 'Хэш-тег не должен повторяться',
    },
    {
      check: input.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина хэш-тега, включая решетку ${MAX_SYMBOLS}`,
    },
    {
      check: input.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`,
    },
    {
      check: input.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хеш-тег содержит недопустимые символы ',
    },
  ];
  return rules.every((rule) =>{
    const isInvalid = rule.check;
    if(isInvalid){
      errorMessages = rule.error;
    }
    return !isInvalid;
  });

};

pristine.addValidator(hashtags, hashtagsHandler, error, 2, false);

hashtags.addEventListener('input', () => {
  if(pristine.validate()) {
    button.disabled = false;
  }
  else{
    button.disabled = true;
  }
});

const removeMessage = () => {
  if(mes.querySelector('.success')){
    mes.querySelector('.success').remove();
  }
  if(mes.querySelector('.error')){
    document.querySelector('.error_message').remove();
  }
};

const onEscapeMes = (evt) => {
  if(isEscape(evt)) {
    removeMessage();
    document.removeEventListener('keydown', onEscapeMes);
  }
};

const onWindowClick = (evt) =>{
  const windowMes = mes.querySelector('.success__inner');
  const withinBoundaries = evt.composedPath().includes(windowMes);

  if(!withinBoundaries){
    removeMessage();
    document.removeEventListener('keydown', onWindowClick);
  }
};
const doSuccessMessage = () => {
  const message = successMessage.cloneNode(true);
  newFragment.append(message);
  mes.append(newFragment);

  const but = mes.querySelector('.success__button');
  but.addEventListener('click', removeMessage);
};

const doErrorMessage = () => {
  const message = errorMessage.cloneNode(true);
  newFragment.append(message);
  mes.append(newFragment);

  const but = mes.querySelector('.error__button');
  but.addEventListener('click', removeMessage);
};

const doMessage = (createMes) =>{
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  createMes();

  document.addEventListener('keydown', onEscapeMes);
  document.addEventListener('click', onWindowClick);
};

const onSuccess = () => {
  button.disabled = false;
  doMessage(doSuccessMessage);
};

const onFail = (err) =>{
  showAlert(err);
  doMessage(doErrorMessage);
};

const method = 'POST';


form.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  button.disabled = true;
  sendRequest(onSuccess, onFail, method,new FormData(form) );
});
