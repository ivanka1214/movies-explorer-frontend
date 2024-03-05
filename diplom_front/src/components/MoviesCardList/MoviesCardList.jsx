import React, { useEffect, useState } from "react";
import useResize from "../../utils/useResize";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { SCREEN_SIZE_BIG, SCREEN_SIZE_SMALL, LIST_SIZE_PARAMS } from "../../constants";

function MoviesCardList({
  foundMovies,
  isLoading,
  error,
  onCardSave,
  savedMovies,
  onCardDelete,
  updateMoviesList,
  useMore,
}) {
  const size = useResize();

  const [moviesShow, setMoviesShow] = useState(0);
  const [moreMoviesShow, setMoreMoviesShow] = useState(0);

  useEffect(() => {
    handleMoviesShow();
  }, [size, foundMovies]);

  function addCards() {
    setMoviesShow(moviesShow + moreMoviesShow);
  }

  function handleMoviesShow() {
    if (size > SCREEN_SIZE_BIG) {
      setMoviesShow(LIST_SIZE_PARAMS.big.show);
      setMoreMoviesShow(LIST_SIZE_PARAMS.big.more);
    } else if (size > SCREEN_SIZE_SMALL && size <= SCREEN_SIZE_BIG) {
      setMoviesShow(LIST_SIZE_PARAMS.middle.show);
      setMoreMoviesShow(LIST_SIZE_PARAMS.middle.more);
    } else if (size <= SCREEN_SIZE_SMALL) {
      setMoviesShow(LIST_SIZE_PARAMS.small.show);
      setMoreMoviesShow(LIST_SIZE_PARAMS.small.more);
    }
  }

  function isMovieSaved(card, savedMovies) {
    return savedMovies.find((item) => {
      return item.movieId === (card.id || card.movieId);
    });
  }

  return (
    <section className="movies_block">
      {isLoading && <Preloader></Preloader>}
      {error && (
        <span className="movies-container__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </span>
      )}
      {!isLoading && !error &&
        (<>
          <div className="movies_list">
            {
            !!foundMovies.length && (useMore ? foundMovies.slice(0, moviesShow): foundMovies).map((card) => {
                  return (
                    <MoviesCard
                      isSaved={isMovieSaved(card, savedMovies)}
                      onCardSave={onCardSave}
                      key={card.id}
                      card={card}
                      onCardDelete={onCardDelete}
                      updateMoviesList={updateMoviesList}
                    ></MoviesCard>
                  );
                })}
           {!foundMovies.length && <span className="movies-container__error">Ничего не найдено</span>}      
          </div>
          {useMore && foundMovies.length > moviesShow && (
            <button
              onClick={addCards}
              className="movies_list__button"
              type="submit"
            >
              Ещё
            </button>
          )}
          </>)
      }
    </section>
  );
}

export default MoviesCardList;
