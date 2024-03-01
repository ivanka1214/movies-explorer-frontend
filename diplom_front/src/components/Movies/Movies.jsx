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
  getMovies,
}) {
  const [foundMovies, setFoundMovies] = useState([]);
  
  useEffect(() => {
    readLocalStorageData();
  }, []);

  useEffect(() => {
    if (movies.length) {
      searchResult();
    }
  }, [movies]);

  function readLocalStorageData() {
    if (localStorage.getItem("foundMovies")) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    }
  }

  function searchResult() {
    // Добавьте проверку на наличие данных в localStorage
    const request = localStorage.getItem("request");
    if (!request) return;

    if (!movies.length) {
      getMovies();
    }
    const moviesFiltered = movies.filter((item) => {
      return (
        (!localStorage.getItem("checkbox") || item.duration < SHORT_MOVIE_LENGTH) &&
        (item.nameRU?.toLowerCase().includes(request) ||
        item.nameEN?.toLowerCase().includes(request))
      );
    });

    setFoundMovies(moviesFiltered);
    localStorage.setItem("foundMovies", JSON.stringify(moviesFiltered));
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