import {getRandomInteger} from '../utils.js';

const MIN_FILMS_AMOUNT = 80000;
const MAX_FILMS_AMOUNT = 150000;

export const generateFilmsStatistic = () => {
  let result = getRandomInteger(MIN_FILMS_AMOUNT, MAX_FILMS_AMOUNT);
  result = result.toString();
  return result.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
};
