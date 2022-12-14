import { showBigPictures } from './show-big-picture.js';

const picture = document.querySelector('.pictures');

const template = document.querySelector('#picture').content;
const templatePictures = template.querySelector('.picture');

const newFragment = document.createDocumentFragment();
let pic;

const renderPhoto = (photo) => {
  const item = templatePictures.cloneNode(true);

  item.querySelector('.picture__img').src = photo.url;
  item.querySelector('.picture__likes').textContent = photo.likes;
  item.querySelector('.picture__comments').textContent = photo.comments.length;

  item.addEventListener('click', (evt) =>{
    evt.preventDefault();
    showBigPictures(photo);
  });

  return item;
};

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    newFragment.appendChild(renderPhoto(photo));
  });
  picture.appendChild(newFragment);
  pic = picture.querySelectorAll('a');
};
const removePictures = () => {
  for(let i = 0; i<pic.length; i++){
    picture.removeChild(picture.querySelectorAll('a')[0]);
  }
};

export {renderPhotos, removePictures};
