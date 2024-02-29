import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE_LENGTH } from "../../constants";

function Movies({
  movies,
  isLoading,
  error,
  onCardSave,
  savedMovies,
}) {
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    searchResult();
  }, [movies]);

  function searchResult() {
    // Добавьте проверку на наличие данных в localStorage
    const request = localStorage.getItem("request");
    if (!request) return;

    const moviesFiltered = movies.filter((item) => {
      return (
        (!localStorage.getItem("checkbox") || item.duration < SHORT_MOVIE_LENGTH) &&
        (item.nameRU?.toLowerCase().includes(request) ||
        item.nameEN?.toLowerCase().includes(request))
      );
    });

    setFoundMovies(moviesFiltered);
  }

  return (
    <>
      <Header page="movie"></Header>
      <main className="page">
        <SearchForm
          onSubmit={searchResult}
          isLoading={isLoading}
          requestParamName="request"
          checkboxParamName="checkbox"
        ></SearchForm>
        {localStorage.getItem('request') && <MoviesCardList
          onCardSave={onCardSave}
          savedMovies={savedMovies}
          error={error}
          isLoading={isLoading}
          foundMovies={foundMovies}
          useMore={true}
        ></MoviesCardList>}
      </main>
      <Footer></Footer>
    </>
  );
}

export default Movies;