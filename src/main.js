import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createProfileRatingTemplate} from './view/profile-rating.js';
import {createShowMoreTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details';

const FILMS_CARDS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileRatingTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');

for (let i = 0; i < FILMS_CARDS_COUNT; i++) {
  render(siteMainElement, createFilmCardTemplate(), 'beforeend');
}

render(siteMainElement, createShowMoreTemplate(), 'beforeend');
render(siteFooterElement, createFilmDetailsTemplate(), 'afterend');
