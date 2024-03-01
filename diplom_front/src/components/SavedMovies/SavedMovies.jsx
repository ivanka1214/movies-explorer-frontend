import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE_LENGTH } from "../../constants";

function SavedMovies({
  onCardDelete,
  savedMovies,
  error,
  onCardSave,
  isLoading,
}) {
  const [foundMovies, setFoundMovies] = useState([]);
  useEffect(() => {
    searchResult();
  }, [savedMovies]);

  function searchResult() {
    const request = localStorage.getItem("requestSaved");

    const moviesFiltered = savedMovies.filter((item) => {
      return (
        (!localStorage.getItem("checkboxSaved") || item.duration < SHORT_MOVIE_LENGTH) &&
        (!localStorage.getItem("requestSaved") || (item.nameRu?.toLowerCase().includes(request) ||
        item.nameEn?.toLowerCase().includes(request)))
      );
    });

    setFoundMovies(moviesFiltered);
  }

  function updateMoviesList(card) {
    setFoundMovies(foundMovies.filter((i) => i._id !== card._id));
  }

  return (
    <>
      <Header page="movie"></Header>
      <main className="page">
        <SearchForm
          onSubmit={searchResult}
          isLoading={isLoading}
          requestParamName="requestSaved"
          checkboxParamName="checkboxSaved"
        ></SearchForm>
        <MoviesCardList
          onCardSave={onCardSave}
          savedMovies={savedMovies}
          error={error}
          isLoading={isLoading}
          foundMovies={foundMovies}
          updateMoviesList={updateMoviesList}
          onCardDelete={onCardDelete}
          useMore={false}
        ></MoviesCardList>
      </main>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
