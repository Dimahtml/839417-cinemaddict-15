const MIN_FILMS_AMOUNT = 80000;
const MAX_FILMS_AMOUNT = 150000;

//  Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateFilmsStatistic = () => {
  let result = getRandomInteger(MIN_FILMS_AMOUNT, MAX_FILMS_AMOUNT);
  result = result.toString();
  return result.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
};
