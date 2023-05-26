import { apiUrl } from './constants';

export function filterMovies(movies, searchValue, checkboxValue) {
  const foundMovies = movies.filter(movie => {
    // movie.movieId = movie.id || movie.movieId;
    // movie.image = `${apiUrl}${movie.image.url}` || movie.image;
    // movie.thumbnail = `${apiUrl}${movie.image.formats.thumbnail.url}` || '';

    return (
      movie['nameRU'].toLowerCase().includes(searchValue.toLowerCase()) ||
      movie['nameEN'].toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  const filteredMovies = checkboxValue
    ? foundMovies.filter(movie => Number(movie.duration) <= 40)
    : foundMovies;

  return filteredMovies;
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function transformTime(time) {
  return time <= 60 ? `${time}мин` : `${Math.round(time / 60)}ч ${time % 60}мин`;
}
