import ProfileRatingView from './view/profile-rating.js';
import MainNavigationView from './view/main-navigation.js';
import SortMenuView from './view/sort.js';
import OverallFilmsListView from './view/overall-films-list-container.js';
import TopRatedFilmsView from './view/top-rated-container.js';
import MostCommentedFilmsView from './view/most-commented-container.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmDetailsView from './view/film-details.js';
import FooterStatisticView from './view/films-statistic.js';
import {generateFilter} from './mock/filter-mock.js';
import {generateFilm} from './mock/film-mock.js';
import {generateFilmsStatistic} from './mock/films-statistic-mock.js';
import {render, RenderPosition} from './utils.js';

const FILMS_COUNT = 19;
const FILMS_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_CARDS_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const filmsStatistic = generateFilmsStatistic();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const renderFilmDetails = (film) => {
  // закрываем предыдущий попап, если он уже был открыт
  const popup = document.body.querySelector('.film-details');
  if (popup) {
    document.body.removeChild(popup);
  }

  const filmDetailsComponent = new FilmDetailsView(film).getElement();
  document.body.appendChild(filmDetailsComponent);
  document.body.classList.add('hide-overflow');

  filmDetailsComponent.querySelector('.film-details__close-btn').addEventListener('click', () => {
    document.body.removeChild(filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  });
};

const renderFilm = (filmsContainer, film) => {
  const filmComponent = new FilmCardView(film);
  render(filmsContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);

  filmComponent.getElement().addEventListener('click', (evt) => {
    if (evt.target.className === 'film-card__poster' ||
    evt.target.className === 'film-card__title' ||
    evt.target.className === 'film-card__comments') {
      renderFilmDetails(film);
    }
  });
};

render(siteHeaderElement, new ProfileRatingView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new OverallFilmsListView().getElement(), RenderPosition.BEFOREEND);

// контейнер для карточек всех фильмов, включая топ-фильмы
const overallFilmsContainer = document.querySelector('.films');

// контейнер для TopRated и MostCommented и кнопки ShowMore
const sortedFilmsList = overallFilmsContainer.querySelector('.films-list');

// контейнер для TopRated и MostCommented карточек фильмов, НЕ включая топ-фильмы
const sortedFilmsContainer = document.querySelector('.films-list__container');

const currentFilmsStep  = Math.min(films.length, FILMS_COUNT_PER_STEP);

for (let i = 0; i < currentFilmsStep; i++) {
  renderFilm(sortedFilmsContainer, films[i]);
}

render(overallFilmsContainer, new TopRatedFilmsView().getElement(), RenderPosition.BEFOREEND);
render(overallFilmsContainer, new MostCommentedFilmsView().getElement(), RenderPosition.BEFOREEND);

const extraFilmsContainers = document.querySelectorAll('.films-list--extra');
const topRatedContainerElement = extraFilmsContainers[0].querySelector('.films-list__container');
const mostCommentedContainerElement = extraFilmsContainers[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  renderFilm(topRatedContainerElement, films[i]);
}

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  renderFilm(mostCommentedContainerElement, films[i]);
}

const footerStatisticElement = siteFooterElement.querySelector('.footer__statistics');

render(footerStatisticElement, new FooterStatisticView(filmsStatistic).getElement(), RenderPosition.BEFOREEND);

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(sortedFilmsList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = overallFilmsContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(sortedFilmsContainer, film));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }

  });
}
