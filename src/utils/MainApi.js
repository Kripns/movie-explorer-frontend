import ApiConfig from './ApiConfig';

function request(url, options) {
  return fetch(url, options).then(handleResponse);
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(name, email, password) {
  return request(`${ApiConfig.url}/signup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
}

export function login(email, password) {
  return request(`${ApiConfig.url}/signin`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(data => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    } else {
      return;
    }
  });
}

export function checkToken() {
  return request(`${ApiConfig.url}/users/me`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
}

export function getSavedMovies() {
  return request(`${ApiConfig.url}/movies`, {
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
}

export function editProfile(data) {
  return request(`${ApiConfig.url}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: ApiConfig.headers,
    body: JSON.stringify(data),
  });
}

export function getUser() {
  return request(`${ApiConfig.url}/users/me`, {
    credentials: 'include',
    headers: ApiConfig.headers,
  });
}

export function saveMovie(data) {
  return request(`${ApiConfig.url}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(data),
  });
}

export function deleteMovie(movieId) {
  return request(`${ApiConfig.url}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
}
