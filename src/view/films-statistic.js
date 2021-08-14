import {createElement} from '../utils.js';

const createFooterStatisticTemplate = (filmsAmount) => (`<p>${filmsAmount} movies inside</p>`);

export default class FooterStatistic {
  constructor(filmsAmount) {
    this._element = null;
    this._filmsAmount = filmsAmount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._filmsAmount);
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
