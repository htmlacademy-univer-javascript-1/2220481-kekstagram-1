import { imageUpload } from './formUpload.js';

const Scale = {
  STEP: 0.25,
  MAX: 1,
  MIN: 0.25,
  START: 1,
};

let scaling = Scale.START;

const form = document.querySelector('.img-upload__form');
const buttons = form.querySelector('.img-upload__scale');
const scaleValue = form.querySelector('.scale__control--value');


const reValue = () => {
  scaling = scaleValue.value.replace('%', '')/100;
  if(scaling <= Scale.MAX && scaling >=  Scale.MIN){
    imageUpload.style.transform = `scale(${scaling.toFixed(2)})`;
  }
};

const onButtonClickScaling =(evt) => {
  const targetImage = evt.target;
  imageUpload.style.transform = `scale(${scaling})`;

  let mode = 0;

  if (targetImage.classList.contains('scale__control--smaller' )){
    mode = -1;
  }
  if (targetImage.classList.contains('scale__control--bigger')){
    mode = 1;
  }


  scaling = scaling + Scale.STEP * mode;
  if(scaling > Scale.MAX){
    scaling = Scale.MAX;
  }
  if(scaling <  Scale.MIN){
    scaling =  Scale.MIN;
  }
  imageUpload.style.transform = `scale(${scaling.toFixed(2)})`;
  scaleValue.value = `${scaling.toFixed(2) * 100  }%`;
};

const scalingPhotos =()=>{
  buttons.addEventListener('click',onButtonClickScaling);
  scaleValue.addEventListener('change', reValue);
  scaleValue.value = `${scaling* 100  }%`;
  imageUpload.style.transform = `scale(${scaling})`;
};
const restart = () => {
  buttons.removeEventListener('click',onButtonClickScaling);
  scaling = Scale.START;
};


export {scalingPhotos, restart};
