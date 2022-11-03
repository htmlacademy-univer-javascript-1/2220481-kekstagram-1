const file = document.querySelector('#upload-file');
const buttonCancel = document.querySelector('#upload-cancel');
const textarea = document.querySelector('.text__description');

file.addEventListener('change',  () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  //document.querySelector('.img-upload__preview').querySelector('img').src = file.value;
});

buttonCancel.addEventListener('click', () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});
const onDocumentEscKeyDown = (evt) => {
  if(evt.key === 'Escape' && document.activeElement !== textarea){
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
};
document.addEventListener('keydown', onDocumentEscKeyDown);

