const API_MOV = "https://api.nomoreparties.co";
const MY_API = "https://api.gp.production5.nomoredomainsrocks.ru";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(`${err.message}`));
  }
}

export function register({ name, email, password }) {
  return fetch(`${MY_API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
}

export function login({ email, password }) {
  return fetch(`${MY_API}/signin`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}

export function getUser(jwt) {
  return fetch(`${MY_API}/users/me`, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
}

export function changeUserInfo({ name, email }) {
  return fetch(`${MY_API}/users/me`, {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => checkResponse(res));
}

export function saveMovie({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  id,
  nameRU,
  nameEN,
}) {
  return fetch(`${MY_API}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      nameRu: nameRU,
      nameEn: nameEN,
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: `${API_MOV}/${image.url}`,
      trailerLink: trailerLink,
      thumbnail: `${API_MOV}${image.url}`,
      movieId: id,
    }),
  }).then((res) => checkResponse(res));
}

export function deleteMovie(movieId) {
  return fetch(`${MY_API}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => checkResponse(res));
}

export function getSavedMovies() {
  return fetch(`${MY_API}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => checkResponse(res));
}
