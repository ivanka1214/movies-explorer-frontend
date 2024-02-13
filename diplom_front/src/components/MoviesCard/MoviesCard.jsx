import React from "react";
import { API_MOV } from "../../utils/MoviesApi";
import { useLocation } from "react-router-dom";
function MoviesCard({
  card,
  onCardSave,
  isSaved,
  onCardDelete,
  updateMoviesList,
}) {
  const location = useLocation();

  function getTimeFromMins(mins) {
    if (mins > 60) {
      let hours = Math.trunc(mins / 60);
      let minutes = mins % 60;
      return hours + "ч " + minutes + "м";
    } else {
      return mins + "м";
    }
  }

  function handleSave() {
    onCardSave(card);
  }

  function updateMovies(card) {
    updateMoviesList(card);
  }

  function handleDelete() {
    onCardDelete(card);

    updateMovies(card);
  }

  return (
    <section
      className={`${location.pathname === "/movies" ? "card" : "card_saved"}`}
    >
      <a className="card__link" href={card.trailerLink} target="blank">
        <img
          src={
            location.pathname === "/movies"
              ? `${API_MOV}/${card.image.url}`
              : `${card.image}`
          }
          className="card__image"
          alt="обложка фильма"
        />
      </a>
      <button
        onClick={location.pathname === "/movies" ? handleSave : handleDelete}
        className={`${location.pathname === "/movies" ? "card__save" : ""} ${
          isSaved && location.pathname === "/movies" ? "card__save_active" : ""
        } ${location.pathname === "/saved-movies" ? "card__save_delete" : ""}`}
      >{`${isSaved ? "" : "Сохранить"}`}</button>
      <div className="card__block">
        <h3 className="card__subtitle">
          {location.pathname === "/movies"
            ? `${card.nameRU}`
            : `${card.nameRu}`}
        </h3>
        <p className="card__time">{getTimeFromMins(card.duration)}</p>
      </div>
    </section>
  );
}

export default MoviesCard;
