import { isEscape } from './utils.js';
import { scalingPhotos, restart } from './scallngPhoto.js';
import { doEffects, restartEffects } from './effectsOnPhoto.js';
const file = document.querySelector('#upload-file');
const buttonCancel = document.querySelector('#upload-cancel');

const imageUpload = document.querySelector('.img-upload__preview');

file.addEventListener('change',  () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  scalingPhotos();
  doEffects();
});

buttonCancel.addEventListener('click', () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  restart();
  restartEffects();
});
const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt) && !evt.target.classList.contains('text__description') && !evt.target.classList.contains('text__hashtags')){
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentEscKeyDown);
    restart();
    restartEffects();
  }
};


document.addEventListener('keydown', onDocumentEscKeyDown);
export {imageUpload};

