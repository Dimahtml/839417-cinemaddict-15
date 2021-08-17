import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  return (`<a href="#${name.toLowerCase()}" class="main-navigation__item">${name}
  <span class="main-navigation__item-count">${count}</span></a>`);
};

const createMainNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies</a>
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation extends AbstractView {
  constructor(filterItems) {
    super();
    this._filterItems = filterItems;
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filterItems);
  }
}
