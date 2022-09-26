const COUNT_OBJECT = 25;

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

const DESCRIPTIONS = [
  'Фотокарточка',
  'случайный снимок',
  'Как вам фото с новой камеры?'
];

const arrayObjects = [];

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

const commentsArray= (count) => {
  const array = [];
  for(let i = 0; i<count; i++){
    array.push({
      id: i,
      avatar: `img/avatar-${randomNumber(1,6)}.svg`,
      message: MESSAGES[randomNumber(0, MESSAGES.length- 1)],
      name: NAME[randomNumber(0,NAME.length - 1)]
    });
  }
  return array;
};

const addPhotos = () => {
  for(let i = 0; i < COUNT_OBJECT; i++){
    arrayObjects[i] = {
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: DESCRIPTIONS[randomNumber(0, DESCRIPTIONS.length - 1)],
      likes: randomNumber(15, 200),
      comments: commentsArray(randomNumber(0,2))
    };
  }
};

addPhotos();

