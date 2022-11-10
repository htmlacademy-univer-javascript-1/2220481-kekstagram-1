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

const isEscape = (evt) => evt.key === 'Escape';

export {randomNumber, isEscape};
