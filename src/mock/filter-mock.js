const filmToFilterMap = {
  WatchList: (films) => films.filter((film) => film.userDetails.isInWatchlist).length,
  History: (films) => films.filter((film) => film.userDetails.isWatched).length,
  Favorites: (films) => films.filter((film) => film.userDetails.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
