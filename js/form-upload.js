import { isEscape } from './utils.js';
import { scalingPhotos, restart } from './scallng-photo.js';
import { onChangeFormEffects, restartEffects } from './effects-on-photo.js';

const body = document.querySelector('body');

const imageUpload = body.querySelector('.img-upload');

const file = imageUpload.querySelector('#upload-file');
const buttonCancel = imageUpload.querySelector('#upload-cancel');

const imageUploadOverlay = imageUpload.querySelector('.img-upload__overlay');
const imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview');

const restartForm = () =>{
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  restart();
  restartEffects();
  const pr = document.querySelector('.pristine-error');
  if(pr){
    pr.style = 'display: none';
    imageUploadOverlay.querySelector('.img-upload__submit').disabled =false;
  }
};

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt) && !evt.target.classList.contains('text__description') && !evt.target.classList.contains('text__hashtags')){
    restartForm();
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }

};
buttonCancel.addEventListener('click', () => {
  restartForm();
  document.removeEventListener('keydown', onDocumentEscKeyDown);
});

file.addEventListener('change',  () => {
  imageUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeyDown);
  scalingPhotos();
  onChangeFormEffects();
});

export {imageUploadPreview, restartForm, imageUploadOverlay, imageUpload};

