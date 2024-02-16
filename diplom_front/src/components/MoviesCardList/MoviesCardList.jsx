import React, { useEffect, useState } from "react";
import useResize from "../../utils/useResize";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  foundMovies,
  isLoading,
  button,
  error,
  searchError,
  onCardSave,
  savedMovies,
  onCardDelete,
  updateMoviesList,
}) {
  const size = useResize();
  const location = useLocation();

  const [moviesStart, setMoviesStart] = useState(0);
  const [moviesShow, setMoviesShow] = useState(0);
  const [moreMoviesShow, setMoreMoviesShow] = useState(0);

  useEffect(() => {
    handleMoviesShow();
  }, [size, foundMovies]);

  function addCards() {
    setMoviesShow(moviesShow + moreMoviesShow);
  }

  function handleMoviesShow() {
    if (size > 1200) {
      setMoviesStart(12);
      setMoviesShow(12);
      setMoreMoviesShow(3);
    } else if (size > 650 && size <= 1200) {
      setMoviesStart(8);
      setMoviesShow(8);
      setMoreMoviesShow(2);
    } else if (size <= 650) {
      setMoviesStart(5);
      setMoviesShow(5);
      setMoreMoviesShow(2);
    }
  }

  function isMovieSaved(card, savedMovies) {
    return savedMovies.find((item) => {
      return item.movieId === (card.id || card.movieId);
    });
  }
  return (
    <section className="movies_block">
      {isLoading ? <Preloader></Preloader> : ""}
      {error ? (
        <span className="movies-container__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </span>
      ) : (
        ""
      )}
      {searchError ? (
        <span className="movies-container__error">Ничего не найдено</span>
      ) : (
        ""
      )}
      <div className="movies_list">
        {location.pathname === "/movies" &&
        foundMovies.length > 0 &&
        !isLoading &&
        !error
          ? foundMovies.slice(0, moviesShow).map((card) => {
              return (
                <MoviesCard
                  isSaved={isMovieSaved(card, savedMovies)}
                  onCardSave={onCardSave}
                  key={card.id}
                  card={card}
                ></MoviesCard>
              );
            })
          : ""}
        {location.pathname === "/saved-movies"
          ? savedMovies.map((card) => {
              return (
                <MoviesCard
                  isSaved={isMovieSaved(card, savedMovies)}
                  onCardDelete={onCardDelete}
                  key={card._id}
                  card={card}
                  updateMoviesList={updateMoviesList}
                ></MoviesCard>
              );
            })
          : ""}
      </div>
      {location.pathname === "/movies" && foundMovies.length > moviesShow ? (
        <button
          onClick={addCards}
          className="movies_list__button"
          type="submit"
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default MoviesCardList;
