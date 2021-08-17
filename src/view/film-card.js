import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const {
    comments,
    filmInfo: {
      title,
      ratingTotal,
      poster,
      description,
      runtime,
      genres,
      release: {
        date,
      },
    },
  } = film;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${ratingTotal}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date.slice(-4)}</span>
      <span class="film-card__duration">${runtime} m</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
