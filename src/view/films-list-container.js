import {createElement} from '../utils.js';

export const createFilmsListTemplate = () => (
  `<section class="films">
    <section class="films-list">
    </section>
  </section>`
);

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
