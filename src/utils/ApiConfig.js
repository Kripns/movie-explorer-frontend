
const apiConfig = {
  url: 'https://api.movieexp.nomoredomains.work',
  // url: 'http://localhost:3001',
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  }
}

export default apiConfig;