import dayjs from 'dayjs';

export const createFilmCommentTemplate = (comment) => {
  const commentDate = comment.date;
  const diff = dayjs().diff(commentDate, 'day');
  let commentDay = '';

  switch (diff) {
    case 0:
      commentDay = 'today';
      break;
    case 1:
      commentDay = 'yesterday';
      break;
    case 2:
      commentDay = '2 days ago';
      break;
    default:
      commentDay = commentDate;
  }

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${commentDay}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};
