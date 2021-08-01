// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const MIN_DESCRIPTION_AMOUNT = 1;
const MAX_DESCRIPTION_AMOUNT = 5;
const MIN_WRITERS_AMOUNT = 1;
const MAX_WRITERS_AMOUNT = 3;
const MIN_ACTORS_AMOUNT = 2;
const MAX_ACTORS_AMOUNT = 5;
const MIN_MOVIE_DURATION = 10;
const MAX_MOVIE_DURATION = 180;
const MIN_GENRES_AMOUNT = 1;
const MAX_GENRES_AMOUNT = 2;
const MIN_COMMENTS_AMOUNT = 0;
const MAX_COMMENTS_AMOUNT = 5;

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
  'made-for-each-other',
  'popeye-meets-sinbad',
  'sagebrush-trail',
  'santa-claus-conquers-the-martians',
  'the-dance-of-life',
  'the-great-flamarion',
  'the-man-with-the-golden-arm',
];

const POSTERS = [
  '../public/images/posters/made-for-each-other.png',
  '../public/images/posters/popeye-meets-sinbad.png',
  '../public/images/posters/sagebrush-trail.jpg',
  '../public/images/posters/santa-claus-conquers-the-martians.jpg',
  '../public/images/posters/the-dance-of-life.jpg',
  '../public/images/posters/the-great-flamarion.jpg',
  '../public/images/posters/the-man-with-the-golden-arm.jpg',
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

const getRandomItems = (array, minItemsAmount, maxItemsAmount) => {
  const arrayCopied = array.slice();
  const itemsAmount = getRandomInteger(minItemsAmount, maxItemsAmount);
  const arrayResult = [];

  for (let i = 0; i < itemsAmount; i++) {
    const itemIndex = getRandomInteger(0, arrayCopied.length - 1);
    const currenItem = arrayCopied.splice(itemIndex, 1);
    arrayResult.push(currenItem);
  }

  return arrayResult.flat();
};

const getOneRandomItem = (array) => {
  const itemIndex = getRandomInteger(0, array.length - 1);
  return array[itemIndex];
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const generateDescription = () => {
  const arrayDescriptions = getRandomItems(DESCRIPTIONS, MIN_DESCRIPTION_AMOUNT, MAX_DESCRIPTION_AMOUNT);
  return arrayDescriptions.join(' ');
};

const generateRating = () => (getRandomInteger(10, 100) / 10).toFixed(1);

const generateRuntime = () => getRandomInteger(MIN_MOVIE_DURATION, MAX_MOVIE_DURATION);

const generateNewComment = () => (
  {
    emotion: getOneRandomItem(COMMENTS.emotions),
    date: 'today',
    author: getOneRandomItem(COMMENTS.authors),
    message: getOneRandomItem(COMMENTS.messages),
  }
);

const generateComments = () => {
  const commentsAmount = getRandomInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT);
  const comments = [];
  console.log(`commentsAmount = ${commentsAmount}`);
  for (let i = 0; i < commentsAmount; i++) {
    console.log(i);
    const newComment = generateNewComment();
    comments.push(newComment);
  }

  return comments;
};

export const generateTask = () => {
  const currentTitle = getOneRandomItem(TITLES);

  return {
    title: currentTitle,
    titlelOriginal: currentTitle,
    poster: getOneRandomItem(POSTERS),
    age: getOneRandomItem(AGES),
    rating: generateRating(),
    director: getOneRandomItem(DIRECTORS),
    writers: getRandomItems(WRITERS, MIN_WRITERS_AMOUNT, MAX_WRITERS_AMOUNT),
    actors: getRandomItems(ACTORS, MIN_ACTORS_AMOUNT, MAX_ACTORS_AMOUNT),
    releaseDate: '',
    runtime: generateRuntime(),
    country: getOneRandomItem(COUNTRIES),
    genres: getRandomItems(GENRES, MIN_GENRES_AMOUNT, MAX_GENRES_AMOUNT),
    description: generateDescription(),
    comments: generateComments(),
    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};
