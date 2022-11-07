import { photos } from './data.js';
const popup = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const closeButton = document.querySelector('.big-picture__cancel');

const showBigPictures = (picture, photo) =>{
  picture.addEventListener('click', () => {
    popup.classList.remove('hidden');

    const newImg = popup.querySelector('.big-picture__img');
    const img = newImg.querySelector('img');

    const newImgSocial = popup.querySelector('.big-picture__social');
    const likes = newImgSocial.querySelector('.likes-count');

    const commentsCount = popup.querySelector('.social__comment-count');
    const commentCount = commentsCount.querySelector('.comments-count');
    const commentAbout = popup.querySelector('.social__comments');

    const description = popup.querySelector('.social__caption');

    img.src = photo.url;
    likes.textContent = photo.likes;
    commentCount.textContent = photo.comments.length;
    description.textContent = photo.description;

    const commentCopy = commentAbout.querySelector('li');
    commentAbout.innerHTML = '';
    const addComments = () => {
      for(let i = 0; i < photo.comments.length; i++){
        const newElement = commentCopy.cloneNode(true);

        newElement.querySelector('p').textContent = photo.comments[i]['message'];
        newElement.querySelector('img').src = photo.comments[i]['avatar'];
        newElement.querySelector('img').alt= photo.comments[i]['name'];

        commentAbout.appendChild(newElement);
      }
    };
    addComments();
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
};

closeButton.addEventListener('click', ()=> {
  popup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

const onDocumentEscKeyDown = (evt) => {
  if(evt.key === 'Escape' && !evt.target.classList.contains('big-picture')){
    popup.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }
};

document.addEventListener('keydown', onDocumentEscKeyDown);

const MakeBigPictures = () =>{
  for(let i = 0; i < pictures.length; i++){
    showBigPictures(pictures[i],photos[i]);
  }
};
MakeBigPictures();
