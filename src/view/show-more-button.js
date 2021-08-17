import AbstractView from './abstract.js';

export const createShowMoreTemplate = () => (
  `<button class="films-list__show-more">
    Show more
  </button>`
);

export default class ShowMoreButton extends AbstractView {
  getTemplate() {
    return createShowMoreTemplate();
  }
}
