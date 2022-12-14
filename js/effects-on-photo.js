import {imageUpload ,imageUploadPreview } from './form-upload.js';

const START_EFFECT  = 'none';

const overlay = document.querySelector('.img-upload__overlay');
const effects = overlay.querySelector('.effects__list');
const slider = overlay.querySelector('.img-upload__effect-level');
const sliderValue = overlay.querySelector('.effect-level__value');

let nowEffect = START_EFFECT;


noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

slider.disabled = true;


const reSlider = (effect) =>{
  let maxValue = 1;
  let minValue = 0;
  let stepValue = 0.1;
  let nameOfEffect = '';
  let type = '';

  switch(effect){
    case 'chrome':
      nameOfEffect = 'grayscale';
      break;
    case 'sepia':
      nameOfEffect = 'sepia';
      break;
    case 'marvin':
      maxValue = 100;
      minValue = 0;
      stepValue = 1;
      type = '%';
      nameOfEffect = 'invert';
      break;
    case 'phobos':
      maxValue = 3;
      minValue = 0;
      stepValue = 0.1;
      type = 'px';
      nameOfEffect = 'blur';
      break;
    case 'heat':
      maxValue = 3;
      minValue = 1;
      stepValue = 0.1;
      nameOfEffect = 'brightness';
      break;
  }


  slider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue
    },
    start: maxValue,
    step: stepValue,
  });
  slider.noUiSlider.on('update', () =>{
    sliderValue.value = slider.noUiSlider.get();
    imageUploadPreview.style.filter = `${nameOfEffect}(${slider.noUiSlider.get()}${type})`;
  });
};

const takeEffect = (effect) =>{
  imageUploadPreview.classList.remove(`effects__preview--${nowEffect}`);
  imageUploadPreview.classList.add(`effects__preview--${effect}`);
  if (effect === 'none'){
    slider.disabled = false;
    slider.classList.add('hidden');
    imageUploadPreview.style.filter = '';
  }
  else{
    nowEffect = effect;
    slider.removeAttribute('disabled');
    slider.classList.remove('hidden');
    reSlider(effect);
  }
};

const onClickEffectsAddEffect = (evt) =>{
  if(evt.target.name === 'effect'){
    takeEffect(evt.target.value);
  }
};
const restartEffects = () => {
  imageUpload.querySelector('.img-upload__form').reset();
  imageUploadPreview.classList.remove(`effects__preview--${nowEffect}`);
  slider.classList.add('hidden');
  effects.removeEventListener('click',onClickEffectsAddEffect);

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const onChangeFormEffects = () =>{
  imageUploadPreview.style.filter = '';
  effects.addEventListener('click', onClickEffectsAddEffect);
};
export {onChangeFormEffects, restartEffects};

