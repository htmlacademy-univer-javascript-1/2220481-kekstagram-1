import { isEscape } from './utils.js';

const COMMENTS_COUNT = 5;
let currentCount = COMMENTS_COUNT;
const arrayComments = [];

const body = document.querySelector('body');

const popup = body.querySelector('.big-picture');
const closeButton = popup.querySelector('.big-picture__cancel');
const updateMore = popup.querySelector('.comments-loader');

const commentAbout = popup.querySelector('.social__comments');
const commentCopy = commentAbout.querySelector('li');

const commentsCount = popup.querySelector('.social__comment-count');
const commentCount = commentsCount.querySelector('.comments-count');

const showCom = commentsCount.querySelector('.showCount');
showCom.textContent = COMMENTS_COUNT;

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt) && !evt.target.classList.contains('big-picture')){
    popup.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentEscKeyDown);
    currentCount = COMMENTS_COUNT;
  }
};

const onUpdateMoreClick = () => {

  if (currentCount >= arrayComments.length){
    currentCount = arrayComments.length;
    updateMore.classList.add('hidden');
  }

  const currentComments = arrayComments.slice(0,currentCount);

  for (let i = 0; i< currentComments.length; i++){
    currentComments[i].classList.remove('hidden');
  }

  showCom.textContent = currentCount;
  currentCount += COMMENTS_COUNT;
};


const addComments = (comments,array) => {
  array.length = 0;
  commentAbout.innerHTML = '';
  for (let i = 0; i < comments.length; i++) {

    const newElement = commentCopy.cloneNode(true);

    newElement.querySelector('p').textContent = comments[i]['message'];
    newElement.querySelector('img').src = comments[i]['avatar'];
    newElement.querySelector('img').alt= comments[i]['name'];

    array.push(newElement);
    commentAbout.appendChild(newElement);
  }

  for (let z = COMMENTS_COUNT; z< arrayComments.length; z++){
    arrayComments[z].classList.add('hidden');
  }

  currentCount += COMMENTS_COUNT;

  updateMore.addEventListener('click', onUpdateMoreClick);
};

const showBigPictures = (photo) =>{
  document.addEventListener('keydown', onDocumentEscKeyDown);


  popup.classList.remove('hidden');

  const newImg = popup.querySelector('.big-picture__img');
  const img = newImg.querySelector('img');

  const newImgSocial = popup.querySelector('.big-picture__social');
  const likes = newImgSocial.querySelector('.likes-count');

  const description = popup.querySelector('.social__caption');

  img.src = photo.url;
  likes.textContent = photo.likes;
  commentCount.textContent = photo.comments.length;
  description.textContent = photo.description;

  addComments(photo.comments, arrayComments);

  if (photo.comments.length <= 5){
    showCom.textContent = photo.comments.length ;
    updateMore.classList.add('hidden');
  }
  else{
    showCom.textContent = COMMENTS_COUNT;
    updateMore.classList.remove('hidden');
  }
  commentsCount.classList.remove('hidden');
  body.classList.add('modal-open');
};


closeButton.addEventListener('click', ()=> {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  updateMore.classList.add('hidden');
  currentCount = COMMENTS_COUNT;
  arrayComments.length = 0;
  updateMore.removeEventListener('click', onUpdateMoreClick);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
});


export {showBigPictures};
