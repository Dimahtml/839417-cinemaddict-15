import AbstractView from './abstract.js';

const createFooterStatisticTemplate = (filmsAmount) => (`<p>${filmsAmount} movies inside</p>`);

export default class FooterStatistic extends AbstractView {
  constructor(filmsAmount) {
    super();
    this._filmsAmount = filmsAmount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._filmsAmount);
  }
}
