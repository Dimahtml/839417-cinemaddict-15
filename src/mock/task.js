// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const MAX_COMMENTS_AMOUNT = 5;

const generateDescription = () => {
  const descripions = [
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

  const commentsAmount = getRandomInteger(1, MAX_COMMENTS_AMOUNT);

  return descripions.slice[0, commentsAmount];
};

export const generateTask = () => ({
  title: '',
  titlelOriginal: '',
  smallPoster: '',
  fullSizePoster: '',
  age: '',
  rating: '',
  director: '',
  writers: '',
  actors: '',
  releaseDate: '',
  runtime: '',
  country: '',
  genres: '',
  description: generateDescription(),
  comments: [
    {
      emotion: '',
      date: '',
      author: '',
      message: '',
    },
  ],
  isInWatchlist: 'false',
  isWatched: 'false',
  isFavorite: 'false',
});
