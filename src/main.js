import ProfileRatingView from './view/profile-rating.js';
import MainNavigationView from './view/main-navigation.js';
import SortMenuView from './view/sort.js';
import FilmsListContainerView from './view/films-list-container.js';
import TopRatedFilmsView from './view/top-rated-container.js';
import MostCommentedFilmsView from './view/most-commented-container.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmDetailsView from './view/film-details.js';
import FooterStatisticView from './view/films-statistic.js';
import NoFilmView from './view/no-film.js';
import FilmsListTitleView from './view/films-list-title.js';
import FilmsContainerView from './view/films-container.js';
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

const closePopup = () => {
  const popup = document.body.querySelector('.film-details');
  if (popup) {
    document.body.removeChild(popup);
    document.body.classList.remove('hide-overflow');
  }
};

const onEscPressDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscPressDown);
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

const renderFilmDetails = (film) => {
  // закрываем предыдущий попап, если он уже был открыт
  const popup = document.body.querySelector('.film-details');
  if (popup) {
    closePopup();
  }

  const filmDetailsComponent = new FilmDetailsView(film).getElement();
  document.body.appendChild(filmDetailsComponent);
  document.body.classList.add('hide-overflow');
  filmDetailsComponent.querySelector('.film-details__close-btn').addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscPressDown);
};

const renderFilm = (filmsContainer, film) => {
  const filmComponent = new FilmCardView(film);
  render(filmsContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);

  filmComponent.getElement().addEventListener('click', (evt) => {
    if (evt.target.className === 'film-card__poster' ||
    evt.target.className === 'film-card__title' ||
    evt.target.className === 'film-card__comments') {
      evt.preventDefault();
      renderFilmDetails(film);
    }
  });
};

const renderFilmsList = (filmsData) => {
  const filmsElement = document.querySelector('.films');
  const filmsListElement = document.querySelector('.films').querySelector('.films-list');

  if (films.length === 0) {
    render(filmsElement, new NoFilmView().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(document.querySelector('.films-list'), new FilmsListTitleView().getElement(), RenderPosition.BEFOREEND);
    render(document.querySelector('.films-list'), new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);
  }

  const sortedFilmsContainer = document.querySelector('.films-list__container');
  const currentFilmsStep  = Math.min(filmsData.length, FILMS_COUNT_PER_STEP);

  for (let i = 0; i < currentFilmsStep; i++) {
    renderFilm(sortedFilmsContainer, filmsData[i]);
  }

  const footerStatisticElement = siteFooterElement.querySelector('.footer__statistics');

  render(footerStatisticElement, new FooterStatisticView(filmsStatistic).getElement(), RenderPosition.BEFOREEND);

  if (filmsData.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;

    render(filmsListElement, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

    const showMoreButton = filmsElement.querySelector('.films-list__show-more');

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
};

const renderExtraFilms = () => {
  const extraFilmsContainers = document.querySelectorAll('.films-list--extra');
  const topRatedContainerElement = extraFilmsContainers[0].querySelector('.films-list__container');
  const mostCommentedContainerElement = extraFilmsContainers[1].querySelector('.films-list__container');

  for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
    renderFilm(topRatedContainerElement, films[i]);
  }

  for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
    renderFilm(mostCommentedContainerElement, films[i]);
  }
};

render(siteHeaderElement, new ProfileRatingView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListContainerView().getElement(), RenderPosition.BEFOREEND);
renderFilmsList(films);

if (films.length > 0) {
  render(document.querySelector('.films'), new TopRatedFilmsView().getElement(), RenderPosition.BEFOREEND);
  render(document.querySelector('.films'), new MostCommentedFilmsView().getElement(), RenderPosition.BEFOREEND);
  renderExtraFilms(films);
}
