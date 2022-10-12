import {photos} from './data.js';

const picture = document.querySelectorAll('.pictures');

const template = document.querySelector('#picture').content;
const templatePictures = template.querySelector('.picture');

const newFragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const item = templatePictures.cloneNote(true);

  item.src = photo.url;

  const likes = item.querySelector('.picture__likes');
  likes.textContent = photo.likes;

  const comments = item.querySelector('.picture__comments');
  comments.textContent = photo.comments;
  return item;
};

const renderPhotos = () => {
  photos.forEach((photo) => {
    newFragment.appendChild(renderPhoto(photo));
  });
  picture.appendChild(newFragment);
};

renderPhotos();
