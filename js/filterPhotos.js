import {removePictures } from './renderPhoto.js';
import { mixArray, debounce } from './utils.js';
import { renderPhotos } from './renderPhoto.js';
const COUNT_COMMENTS = 10;

const formFilters = document.querySelector('.img-filters__form');

let data;
const aboba = (d) => {
  data = d;
};
const filters = {
  'filter-default': () => data.slice(),
  'filter-random':() => mixArray(data).slice(0,COUNT_COMMENTS),
  'filter-discussed': () => data.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length)
};

const onClickFilter =debounce((evt) =>{
  if(evt.target.tagName === 'BUTTON'){
    const selected = formFilters.querySelector('.img-filters__button--active');
    if(selected){
      selected.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
    removePictures();
    renderPhotos(filters[evt.target.id]());
  }
});


formFilters.addEventListener('click', onClickFilter);

export {aboba};
