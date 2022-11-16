import {photos} from './data.js';
import { showBigPictures } from './showBigPicture.js';
const picture = document.querySelector('.pictures');

const template = document.querySelector('#picture').content;
const templatePictures = template.querySelector('.picture');

const newFragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const item = templatePictures.cloneNode(true);

  const img = item.querySelector('.picture__img');
  img.src = photo.url;

  const likes = item.querySelector('.picture__likes');
  likes.textContent = photo.likes;

  const comments = item.querySelector('.picture__comments');
  comments.textContent = photo.comments.length;

  item.addEventListener('click', (evt) =>{
    evt.preventDefault();
    showBigPictures(photo);
  });

  return item;
};

const renderPhotos = () => {
  photos.forEach((photo) => {
    newFragment.appendChild(renderPhoto(photo));
  });
  picture.appendChild(newFragment);
};

renderPhotos();
