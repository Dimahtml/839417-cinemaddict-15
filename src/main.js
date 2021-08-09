import {createProfileRatingTemplate} from './view/profile-rating.js';
import {createMainNavigationTemplate} from './view/main-navigation.js';
import {createSortMenuTemplate} from './view/sort.js';
import {createOverallFilmsListTemplate} from './view/overall-films-list-container.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-container.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {createFooterStatisticTemplate} from './view/films-statistic.js';
import {generateFilter} from './mock/filter-mock.js';
import {generateFilm} from './mock/film-mock.js';
import {generateFilmsStatistic} from './mock/films-statistic-mock.js';

const FILMS_COUNT = 19;
const FILMS_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_CARDS_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const filmsStatistic = generateFilmsStatistic();

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileRatingTemplate());
render(siteMainElement, createMainNavigationTemplate(filters));
render(siteMainElement, createSortMenuTemplate());
render(siteMainElement, createOverallFilmsListTemplate());

// контейнер для карточек всех фильмов, включая топ-фильмы
const overallFilmsContainer = document.querySelector('.films');

// контейнер для sortedFilmsContainer и кнопки ShowMore
const sortedFilmsList = overallFilmsContainer.querySelector('.films-list');

// контейнер для отсортированных карточек фильмов, НЕ включая топ-фильмы
const sortedFilmsContainer = document.querySelector('.films-list__container');

const currentFilmsStep  = Math.min(films.length, FILMS_COUNT_PER_STEP);

for (let i = 0; i < currentFilmsStep; i++) {
  render(sortedFilmsContainer, createFilmCardTemplate(films[i]));
}

render(overallFilmsContainer, createTopRatedFilmsTemplate());
render(overallFilmsContainer, createMostCommentedFilmsTemplate());

const extraFilmsContainers = document.querySelectorAll('.films-list--extra');
const topRatedContainerElement = extraFilmsContainers[0].querySelector('.films-list__container');
const mostCommentedContainerElement = extraFilmsContainers[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  render(topRatedContainerElement, createFilmCardTemplate(films[i]));
}

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  render(mostCommentedContainerElement, createFilmCardTemplate(films[i]));
}

render(siteFooterElement, createFilmDetailsTemplate(films[0]), 'afterend');

const footerStatisticElement = siteFooterElement.querySelector('.footer__statistics');

render(footerStatisticElement, createFooterStatisticTemplate(filmsStatistic));

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(sortedFilmsList, createShowMoreTemplate());

  const showMoreButton = overallFilmsContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(sortedFilmsContainer, createFilmCardTemplate(film)));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }

  });
}
