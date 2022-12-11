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
    imageUpload.style.filter = `${nameOfEffect}(${slider.noUiSlider.get()}${type})`;
  });
};

const takeEffect = (effect) =>{
  imageUpload.classList.remove(`effects__preview--${nowEffect}`);
  imageUpload.classList.add(`effects__preview--${effect}`);

  if (effect === 'none'){
    slider.disabled = false;
    slider.classList.add('hidden');
    imageUpload.style.filter = '';
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
  slider.classList.add('hidden');
  effects.removeEventListener('click',onClickEffectsAddEffect);
  imageUpload.removeAttribute('class');
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  takeEffect('none');
};

const onChangeFormEffects = () =>{
  imageUpload.style.filter = '';
  effects.addEventListener('click', onClickEffectsAddEffect);
};
export {onChangeFormEffects, restartEffects};

