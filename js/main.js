const randomNumber = (min, max) => {
  if(min >= max){
    const newMax = min;
    min = max;
    max = newMax;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const lenghtCheck = (text , maxLenght) =>(String(text).length <= maxLenght);


console.log(lenghtCheck('Абобыч Абобов Абоба', 10));
