const NAME = [
  'Абоба',
  'Matthew Ball',
  'Алтынмаргендурдинпарденхуинбек'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.' ,
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
  'Фотокарточка',
  'случайный снимок',
  'Как вам фото с новой камеры?'
];

const arrayObject = [];
const countObject = 25;


const randomNumber = (min, max) => {
  if(min < 0 || max < 0){
    return 0;
  }
  const arrayNumbers = [min, max];
  if(min >= max){
    min = arrayNumbers[1];
    max = arrayNumbers[0];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const pushArraySplice = (array) => {
  const number = array[randomNumber(1,array.length)];
  array.splice(array.indexOf(number), 1);
  return number;
};
const pushArray = (count) => {
  const array = [];
  for(let i = 1; i <= count; i++){
    array.push(i);
  }
  return array;
};
const arrayId = pushArray(25);
const arrayUrl = pushArray(25);
const arrayIdComments = pushArray(1000);
const commentsArray= (count) => {
  const array = [];
  for(let i = 0; i<=count -1; i++){
    array[i] = {
      id: pushArraySplice(arrayIdComments),
      avatar: `img/avatar-${randomNumber(1,6)}.svg`,
      message: MESSAGES[randomNumber(0, MESSAGES.length- 1)],
      name: NAME[randomNumber(0,NAME.length - 1)]
    };
  }
  return array;
};
for(let i = 0; i < countObject; i++){
  arrayObject[i] = {
    id: pushArraySplice(arrayId),
    url: `photos/${pushArraySplice(arrayUrl)}.jpg`,
    description: descriptions[randomNumber(0, descriptions.length - 1)],
    likes: randomNumber(15, 200),
    comments: commentsArray(2)
  };
}

