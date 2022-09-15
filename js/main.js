const randomNumber = (min, max) => {
  if(min >= max){
    const newMax = min;
    min = max;
    max = newMax;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const lenghtChecked = (text , maxLenght) =>(String(text).length <= maxLenght);