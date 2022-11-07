const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const button = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item-invalid',
  successClass: 'img-upload__item-valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const hashtags = document.querySelector('.text__hashtags');

let errorMessage = '';
const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';
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
      errorMessage = rule.error;
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
form.addEventListener('submit', (evt) =>{
  evt.preventDefault();

  pristine.validate();
});
