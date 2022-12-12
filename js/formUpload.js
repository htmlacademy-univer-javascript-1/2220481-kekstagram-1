import { isEscape } from './utils.js';
import { scalingPhotos, restart } from './scallngPhoto.js';
import { onChangeFormEffects, restartEffects } from './effectsOnPhoto.js';

const file = document.querySelector('#upload-file');
const buttonCancel = document.querySelector('#upload-cancel');

const imageUpload = document.querySelector('.img-upload__preview');

const restartForm = () =>{
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  restart();
  restartEffects();
  const pr = document.querySelector('.pristine-error');
  if(pr){
    pr.style = 'display: none';
    document.querySelector('.img-upload__submit').disabled =false;
  }
};

buttonCancel.addEventListener('click', restartForm);


const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt) && !evt.target.classList.contains('text__description') && !evt.target.classList.contains('text__hashtags')){
    restartForm();
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }
};

file.addEventListener('change',  () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeyDown);
  scalingPhotos();
  onChangeFormEffects();
});

export {imageUpload, restartForm};

