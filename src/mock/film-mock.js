import dayjs from 'dayjs';
import {getRandomInteger, getRandomItems, getOneRandomItem} from '../utils.js';

/**
 * Константы.
 */

const MIN_DESCRIPTION_AMOUNT = 1;
const MAX_DESCRIPTION_AMOUNT = 5;
const MIN_WRITERS_AMOUNT = 1;
const MAX_WRITERS_AMOUNT = 3;
const MIN_ACTORS_AMOUNT = 2;
const MAX_ACTORS_AMOUNT = 5;
const MIN_MOVIE_DURATION = 10;
const MAX_MOVIE_DURATION = 180;
const MIN_GENRES_AMOUNT = 1;
const MAX_GENRES_AMOUNT = 3;
const MIN_COMMENTS_AMOUNT = 0;
const MAX_COMMENTS_AMOUNT = 5;
const MIN_MOVIE_ID = 1;
const MAX_MOVIE_ID = 1000;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 1000;
const MIN_MOVIE_RELEASE_DAYS_SUBTRACT = 10;
const MAX_MOVIE_RELEASE_DAYS_SUBTRACT = 30000;
const MIN_USER_WATCH_DAYS_SUBTRACT = 1;
const MAX_USER_WATCH_DAYS_SUBTRACT = 1000;
const MIN_POST_COMMENT_MINUTES_SUBTRACT = 10;
const MAX_POST_COMMENT_MINUTES_SUBTRACT = 10080;
const ACTORS = [
  'Robert De Niro',
  'Al Pacino',
  'Tom Hanks',
  'Denzel Washington',
  'Morgan Freeman',
  'Leonardo DiCaprio',
  'Johnny Depp',
  'Tom Cruise',
  'Marilyn Monroe',
  'Natalie Portman',
  'Scarlett Johansson',
  'Emma Stone',
  'Milla Jovovich',
  'Bruce Willis',
];
const WRITERS = [
  'Damien Chazelle',
  'Drew Goddard',
  'Frank Darabont',
  'Stanley Kubrick',
  'Christopher Nolan',
  'Joel & Ethan Coen',
  'Woody Allen',
  'James Cameron',
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const TITLES = [
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'Santa Claus Conquers The Martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The Man with the Golden Arm',
];
const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];
const AGES = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];
const DIRECTORS = [
  'Steven Spielberg',
  'Martin Scorsese',
  'Quentin Tarantino',
  'George Lucas',
  'James Cameron',
  'Guy Ritchie',
];
const COUNTRIES = [
  'USA',
  'Russia',
  'USSR',
  'France',
  'Great Britain',
  'Italy',
];
const GENRES = [
  'Drama',
  'Thriller',
  'Action',
  'Comedy',
  'Fantasy',
  'Romance',
  'Musical',
  'Mystery',
];
const COMMENTS = {
  emotions: [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ],
  messages: [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
    'The best film in the world',
    'not bad',
    'good actors but poor story',
    'soundtrack in the film is so coooooool! La-la-laaaa-pam-paraaaam!',
  ],
  authors: [
    'Tim Macoveev',
    'John Doe',
    'Superman',
    'NagibatorXXX',
    'Likvidator2008',
    'Laskovaya-Kiska',
    'Pobeditel',
    'Kinoman',
    'Ivan Petrovich',
    'master Yoda',
    'mister Twister',
    'Thomas Shelby',
    '-=NEO=-',
  ],
  date: [

  ],
};

/**
 * Работа с датами.
 */

const getMovieReleaseDate = () => {
  // получаем случайное количество дней, прошедшее с момента выхода фильма
  const dateSubtract = getRandomInteger(MIN_MOVIE_RELEASE_DAYS_SUBTRACT, MAX_MOVIE_RELEASE_DAYS_SUBTRACT);
  return dayjs().subtract(dateSubtract, 'day').format('D MMMM YYYY');
};

const getWatchingMovieDate = () => {
  // получаем случайное количество дней, прошедшее с момента просмотра фильма
  const dateSubtract = getRandomInteger(MIN_USER_WATCH_DAYS_SUBTRACT, MAX_USER_WATCH_DAYS_SUBTRACT);
  return dayjs().subtract(dateSubtract, 'day').format('D MMMM YYYY');
};

const getCommentPostingDate = () => {
  // получаем случайное количество дней, прошедшее с момента написания комментария
  const dateSubtract = getRandomInteger(MIN_POST_COMMENT_MINUTES_SUBTRACT, MAX_POST_COMMENT_MINUTES_SUBTRACT);
  return dayjs().subtract(dateSubtract, 'minute').format('YYYY/MM/DD HH:mm');
};

/**
 * Функции, которые генерируют данные.
 */

const getMovieId = () => getRandomInteger(MIN_MOVIE_ID, MAX_MOVIE_ID);

const generateDescription = () => {
  const arrayDescriptions = getRandomItems(DESCRIPTIONS, MIN_DESCRIPTION_AMOUNT, MAX_DESCRIPTION_AMOUNT);
  return arrayDescriptions.join(' ');
};

const generateRating = () => (getRandomInteger(10, 100) / 10).toFixed(1);

const generateRuntime = () => getRandomInteger(MIN_MOVIE_DURATION, MAX_MOVIE_DURATION);

const generateNewComment = () => (
  {
    id: getRandomInteger(MIN_COMMENT_ID, MAX_COMMENT_ID),
    emotion: getOneRandomItem(COMMENTS.emotions),
    date: getCommentPostingDate(),
    author: getOneRandomItem(COMMENTS.authors),
    message: getOneRandomItem(COMMENTS.messages),
  }
);

const generateComments = () => {
  const commentsAmount = getRandomInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT);
  const comments = [];
  for (let i = 0; i < commentsAmount; i++) {
    const newComment = generateNewComment();
    comments.push(newComment);
  }

  return comments;
};

// Здесь аргумент comments - это массив объектов. Каждый comment - это объект.
// в процессе разработки функция временно не нужна
// const getCommentsIDs = (comments) => {
//   const commentsIDs = [];
//   for (const comment of comments) {
//     commentsIDs.push(comment.id);
//   }
//   return commentsIDs;
// };

/**
 * Генерация структуры данных, описывающих фильм.
 */

export const generateFilm = () => {
  const currentTitle = getOneRandomItem(TITLES);
  const isWatched = Boolean(getRandomInteger(0, 1));
  const comments = generateComments();

  const getWatchingDate = () => {
    const result = isWatched ? getWatchingMovieDate() : '';
    return result;
  };

  return {
    id: getMovieId(),
    comments: comments,
    filmInfo: {
      title: currentTitle,
      titleAlternative: currentTitle,
      ratingTotal: generateRating(),
      poster: getOneRandomItem(POSTERS),
      ageRating: getOneRandomItem(AGES),
      director: getOneRandomItem(DIRECTORS),
      writers: getRandomItems(WRITERS, MIN_WRITERS_AMOUNT, MAX_WRITERS_AMOUNT),
      actors: getRandomItems(ACTORS, MIN_ACTORS_AMOUNT, MAX_ACTORS_AMOUNT),
      release: {
        date: getMovieReleaseDate(),
        releaseCountry: getOneRandomItem(COUNTRIES),
      },
      runtime: generateRuntime(),
      genres: getRandomItems(GENRES, MIN_GENRES_AMOUNT, MAX_GENRES_AMOUNT),
      description: generateDescription(),
    },
    userDetails: {
      isInWatchlist: Boolean(getRandomInteger(0, 1)),
      isWatched,
      watchingDate: getWatchingDate(),
      isFavorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};
