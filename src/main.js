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
import {render, RenderPosition} from './utils/render.js';

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

const renderFilmDetails = (film) => {
  const popup = document.body.querySelector('.film-details');
  if (popup) {
    closePopup();
  }

  const filmDetailsComponent = new FilmDetailsView(film);
  document.body.appendChild(filmDetailsComponent.getElement());
  document.body.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscPressDown);

  filmDetailsComponent.setCloseButtonClickHandler(() => {
    closePopup();
  });
};

const renderFilm = (filmsContainer, film) => {
  const filmComponent = new FilmCardView(film);
  render(filmsContainer, filmComponent, RenderPosition.BEFOREEND);
  filmComponent.setFilmCardClickHandler(() => renderFilmDetails(film));
};

const renderFilmsList = (filmsData) => {
  const filmsElement = document.querySelector('.films');
  const filmsListElement = document.querySelector('.films').querySelector('.films-list');

  if (films.length === 0) {
    render(filmsElement, new NoFilmView(), RenderPosition.BEFOREEND);
  } else {
    render(document.querySelector('.films-list'), new FilmsListTitleView(), RenderPosition.BEFOREEND);
    render(document.querySelector('.films-list'), new FilmsContainerView(), RenderPosition.BEFOREEND);
  }

  const sortedFilmsContainer = document.querySelector('.films-list__container');
  const currentFilmsStep  = Math.min(filmsData.length, FILMS_COUNT_PER_STEP);

  for (let i = 0; i < currentFilmsStep; i++) {
    renderFilm(sortedFilmsContainer, filmsData[i]);
  }

  const footerStatisticElement = siteFooterElement.querySelector('.footer__statistics');

  render(footerStatisticElement, new FooterStatisticView(filmsStatistic), RenderPosition.BEFOREEND);

  if (filmsData.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(sortedFilmsContainer, film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
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

render(siteHeaderElement, new ProfileRatingView(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListContainerView(), RenderPosition.BEFOREEND);
renderFilmsList(films);

if (films.length > 0) {
  render(document.querySelector('.films'), new TopRatedFilmsView(), RenderPosition.BEFOREEND);
  render(document.querySelector('.films'), new MostCommentedFilmsView(), RenderPosition.BEFOREEND);
  renderExtraFilms(films);
}
