import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';

const MIN_MOVIE_RELEASE_DAYS_SUBTRACT = 10;
const MAX_MOVIE_RELEASE_DAYS_SUBTRACT = 30000;
const MIN_USER_WATCH_DAYS_SUBTRACT = 1;
const MAX_USER_WATCH_DAYS_SUBTRACT = 1000;
const MIN_POST_COMMENT_MINUTES_SUBTRACT = 10;
const MAX_POST_COMMENT_MINUTES_SUBTRACT = 10080;

export const getMovieReleaseDate = () => {
  // получаем случайное количество дней, прошедшее с момента выхода фильма
  const dateSubtract = getRandomInteger(MIN_MOVIE_RELEASE_DAYS_SUBTRACT, MAX_MOVIE_RELEASE_DAYS_SUBTRACT);
  return dayjs().subtract(dateSubtract, 'day').format('D MMMM YYYY');
};

export const getWatchingMovieDate = () => {
  // получаем случайное количество дней, прошедшее с момента просмотра фильма
  const dateSubtract = getRandomInteger(MIN_USER_WATCH_DAYS_SUBTRACT, MAX_USER_WATCH_DAYS_SUBTRACT);
  return dayjs().subtract(dateSubtract, 'day').format('D MMMM YYYY');
};

export const getCommentPostingDate = () => {
  // получаем случайное количество дней, прошедшее с момента написания комментария
  const dateSubtract = getRandomInteger(MIN_POST_COMMENT_MINUTES_SUBTRACT, MAX_POST_COMMENT_MINUTES_SUBTRACT);
  return dayjs().subtract(dateSubtract, 'minute').format('YYYY/MM/DD HH:mm');
};
