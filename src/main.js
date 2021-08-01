import {createProfileRatingTemplate} from './view/profile-rating.js';
import {createMainNavigationTemplate} from './view/main-navigation.js';
import {createSortMenuTemplate} from './view/sort.js';
import {createOverallFilmsListTemplate} from './view/overall-films-list-container.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-container.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {generateTask} from './mock/task.js';

const FILMS_CARDS_COUNT = 5;
const TOP_RATED_FILMS_CARDS_COUNT = 2;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileRatingTemplate());
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createSortMenuTemplate());
render(siteMainElement, createOverallFilmsListTemplate());

// контейнер для карточек всех фильмов, включая топ-фильмы
const overallFilmsContainer = document.querySelector('.films');

// контейнер для sortedFilmsContainer и кнопки ShowMore
const sortedFilmsList = overallFilmsContainer.querySelector('.films-list');

// контейнер для отсортированных карточек фильмов, НЕ включая топ-фильмы
const sortedFilmsContainer = document.querySelector('.films-list__container');

for (let i = 0; i < FILMS_CARDS_COUNT; i++) {
  render(sortedFilmsContainer, createFilmCardTemplate());
}

render(sortedFilmsList, createShowMoreTemplate());
render(overallFilmsContainer, createTopRatedFilmsTemplate());
render(overallFilmsContainer, createMostCommentedFilmsTemplate());

const extraFilmsContainers = document.querySelectorAll('.films-list--extra');
const topRatedContainerElement = extraFilmsContainers[0].querySelector('.films-list__container');
const mostCommentedContainerElement = extraFilmsContainers[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  render(topRatedContainerElement, createFilmCardTemplate());
}

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  render(mostCommentedContainerElement, createFilmCardTemplate());
}

render(siteFooterElement, createFilmDetailsTemplate(), 'afterend');

console.log(generateTask());
