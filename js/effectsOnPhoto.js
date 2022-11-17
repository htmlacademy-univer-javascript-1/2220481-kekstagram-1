import { imageUpload } from './formUpload.js';

const START_EFFECT  = 'none';

const effects = document.querySelector('.effects__list');
const slider = document.querySelector('.img-upload__effect-level');


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

slider.setAttribute('disabled', true);


const reSlider = (effect) =>{
  let maxValue = 1;
  let minValue = 0;
  let stepValue = 0.1;
  let nameOfEffect = '';
  let type = '';
  if(effect === 'chrome'){
    nameOfEffect = 'grayscale';
  }
  if(effect === 'sepia'){
    nameOfEffect = 'sepia';
  }
  if(effect === 'marvin'){
    maxValue = 100;
    minValue = 0;
    stepValue = 1;
    type = '%';
    nameOfEffect = 'invert';
  }
  if(effect === 'phobos'){
    maxValue = 3;
    minValue = 0;
    stepValue = 0.1;
    type = 'px';
    nameOfEffect = 'blur';
  }
  if(effect === 'heat'){
    maxValue = 3;
    minValue = 1;
    stepValue = 0.1;
    nameOfEffect = 'brightness';
  }

  slider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue
    },
    start: maxValue,
    step: stepValue,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  slider.noUiSlider.on('update', () =>{
    imageUpload.style.filter = `${nameOfEffect}(${slider.noUiSlider.get()}${type})`;
  });
};

const takeEffect = (effect) =>{
  imageUpload.classList.remove(`effects__preview--${nowEffect}`);
  imageUpload.classList.add(`effects__preview--${effect}`);
  nowEffect = effect;

  if (effect === 'none'){
    slider.setAttribute('disabled',false);
    imageUpload.style.filter = '';
  }
  else{
    slider.removeAttribute('disabled');
    reSlider(effect);
  }
};

const addEffect = (evt) =>{
  const targetEffect = evt.target;
  if(targetEffect.name === 'effect'){
    takeEffect(targetEffect.value);
  }
};
const restartEffects = () => {
  effects.removeEventListener('click',addEffect);
  imageUpload.classList.remove(`effects__preview--${nowEffect}`);
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  slider.setAttribute('disabled', true);
};

const doEffects = () =>{
  imageUpload.style.filter = '';
  effects.addEventListener('click', addEffect);
};
export {doEffects, restartEffects};

