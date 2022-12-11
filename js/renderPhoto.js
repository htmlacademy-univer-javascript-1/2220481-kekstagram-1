import { showBigPictures } from './showBigPicture.js';
const picture = document.querySelector('.pictures');

const template = document.querySelector('#picture').content;
const templatePictures = template.querySelector('.picture');

const newFragment = document.createDocumentFragment();

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
};

export {renderPhotos};
