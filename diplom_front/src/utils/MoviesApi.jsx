export const API_MOV = "https://api.nomoreparties.co";

export function getMovie() {
  return fetch(`${API_MOV}/beatfilm-movies`, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(`${err.message}`));
  }
}
