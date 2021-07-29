import {createProfileRatingTemplate} from './view/profile-rating.js';
import {createMainNavigationTemplate} from './view/main-navigation.js';
import {createSortMenuTemplate} from './view/sort.js';
import {createOverallFilmsListTemplate} from './view/overall-films-list-container.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-container.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details.js';

const FILMS_CARDS_COUNT = 5;
const TOP_RATED_FILMS_CARDS_COUNT = 2;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileRatingTemplate(), 'beforeend');
render(siteMainElement, createMainNavigationTemplate(), 'beforeend');
render(siteMainElement, createSortMenuTemplate(), 'beforeend');
render(siteMainElement, createOverallFilmsListTemplate(), 'beforeend');

// контейнер для карточек всех фильмов, включая топ-фильмы
const overallFilmsContainer = document.querySelector('.films');

// контейнер для sortedFilmsContainer и кнопки ShowMore
const sortedFilmsList = overallFilmsContainer.querySelector('.films-list');

// контейнер для отсортированных карточек фильмов, НЕ включая топ-фильмы
const sortedFilmsContainer = document.querySelector('.films-list__container');

for (let i = 0; i < FILMS_CARDS_COUNT; i++) {
  render(sortedFilmsContainer, createFilmCardTemplate(), 'beforeend');
}

render(sortedFilmsList, createShowMoreTemplate(), 'beforeend');
render(overallFilmsContainer, createTopRatedFilmsTemplate(), 'beforeend');
render(overallFilmsContainer, createMostCommentedFilmsTemplate(), 'beforeend');

const extraFilmsContainers = document.querySelectorAll('.films-list--extra');
const topRatedContainerElement = extraFilmsContainers[0].querySelector('.films-list__container');
const mostCommentedContainerElement = extraFilmsContainers[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  render(topRatedContainerElement, createFilmCardTemplate(), 'beforeend');
}

for (let i = 0; i < TOP_RATED_FILMS_CARDS_COUNT; i++) {
  render(mostCommentedContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(siteFooterElement, createFilmDetailsTemplate(), 'afterend');
