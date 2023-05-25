export function filterMovies(movies, searchValue, checkboxValue) {
  const foundMovies = movies.filter(movie =>
    movie['nameRU'].toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredMovies = checkboxValue
    ? foundMovies.filter(movie => Number(movie.duration) <= 40)
    : foundMovies;
  
  return filteredMovies;
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}