import './formUpload.js';
import './renderPhoto.js';
import './showBigPicture.js';
import './hashtags.js';
import './scallngPhoto.js';
import './effectsOnPhoto.js';
import './serverWork.js';

import {renderPhotos} from './renderPhoto.js';
import {sendRequest } from './serverWork.js';
import {showAlert} from './utils.js';

const onSuccess = (data) => {
  renderPhotos(data);
};

const onFail = (error) =>{
  showAlert(error);
};

const method = 'GET';

sendRequest(onSuccess, onFail, method);
