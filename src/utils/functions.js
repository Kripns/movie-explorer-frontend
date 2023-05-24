export default function filterMovies(movies, searchValue, checkboxValue) {
  const foundMovies = movies.filter(movie =>
    movie['nameRU'].toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredMovies = checkboxValue
    ? foundMovies.filter(movie => Number(movie.duration) <= 40)
    : foundMovies;
  
  return filteredMovies;
}