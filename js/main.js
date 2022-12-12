import './formUpload.js';
import './renderPhoto.js';
import './showBigPicture.js';
import './hashtags.js';
import './scallngPhoto.js';
import './effectsOnPhoto.js';
import './serverWork.js';
import './filterPhotos.js';
import './uploadUserPhoto.js';
import {renderPhotos} from './renderPhoto.js';
import {sendRequest } from './serverWork.js';
import {showAlert} from './utils.js';
import { getPhotos } from './filterPhotos.js';

const onSuccess = (data) => {
  renderPhotos(data);
  getPhotos(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onFail = (error) =>{
  showAlert(error);
};

const method = 'GET';

sendRequest(onSuccess, onFail, method);

