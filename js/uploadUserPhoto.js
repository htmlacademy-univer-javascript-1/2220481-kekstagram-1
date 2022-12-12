import { imageUpload } from './formUpload.js';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');

const userImg = imageUpload.querySelector('img');

const onChangeFileChooser = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    userImg.src = URL.createObjectURL(file);
  }
};

fileChooser.addEventListener('change', onChangeFileChooser);
