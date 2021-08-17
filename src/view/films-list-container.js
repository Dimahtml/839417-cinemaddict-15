import AbstractView from './abstract.js';

const createFilmsListTemplate = () => (
  `<section class="films">
    <section class="films-list">
    </section>
  </section>`
);

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
