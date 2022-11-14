import { photos } from './data.js';
const popup = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const closeButton = document.querySelector('.big-picture__cancel');
const updateMore = document.querySelector('.comments-loader');

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
    const showCom = commentsCount.querySelector('.showCount');
    showCom.textContent = '5';

    const description = popup.querySelector('.social__caption');

    img.src = photo.url;
    likes.textContent = photo.likes;
    commentCount.textContent = photo.comments.length;
    description.textContent = photo.description;
    const lastIndex = 5;
    const commentCopy = commentAbout.querySelector('li');
    const arrayLi = [];
    commentAbout.innerHTML = '';
    const addComments = () => {
      for(let i = 0; i < photo.comments.length; i++){
        const newElement = commentCopy.cloneNode(true);

        newElement.querySelector('p').textContent = photo.comments[i]['message'];
        newElement.querySelector('img').src = photo.comments[i]['avatar'];
        newElement.querySelector('img').alt= photo.comments[i]['name'];
        arrayLi.push(newElement);
        commentAbout.appendChild(newElement);
      }
    };
    const countCom = photo.comments.length;
    if (countCom > 5){
      updateMore.classList.remove('hidden');
      addComments();
      for(let j = lastIndex; j<= photo.comments.length - 1;j++){
        arrayLi[j].classList.add('hidden');
      }
      let index= 0;
      const addCom =()=>{
        index+=5;
        for(let j = index; j<= index + 4;j++){
          if(arrayLi.length - 1> j){
            showCom.textContent = j+1;
            arrayLi[j].classList.remove('hidden');
          }
          else{
            showCom.textContent = countCom;
            arrayLi[countCom -1].classList.remove('hidden');
            updateMore.classList.add('hidden');
            updateMore.removeEventListener('click',addCom);
          }
        }
      };
      updateMore.addEventListener('click',addCom);
    }
    else{
      addComments();
      showCom.textContent = countCom;
      updateMore.classList.add('hidden');
    }

    document.querySelector('.social__comment-count').classList.remove('hidden');
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
