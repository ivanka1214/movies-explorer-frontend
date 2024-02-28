import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({
  movies,
  onSearch,
  isLoading,
  error,
  onCardSave,
  savedMovies,
}) {
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    onSearch();
  }, []);

  useEffect(() => {
    searchResult();
  }, [movies]);

  function searchResult() {
    // Добавьте проверку на наличие данных в localStorage
    const request = localStorage.getItem("request");
    if (!request) return;

    const moviesFiltered = movies.filter((item) => {
      return (
        (!localStorage.getItem("checkbox") || item.duration < 40) &&
        (item.nameRU?.toLowerCase().includes(request) ||
        item.nameEN?.toLowerCase().includes(request) ||
        item.nameRu?.toLowerCase().includes(request) ||
        item.nameEn?.toLowerCase().includes(request))
      );
    });

    setFoundMovies(moviesFiltered);
  }

  function updateMoviesList(card) {
    if (isSearched) {
      const newArrey = filteredMovies.filter((i) => i._id !== card._id);
      setFilteredMovies(newArrey);
    }
  }
  console.log('savedMovies: ', savedMovies)
  console.log('foundMovies: ', foundMovies)

  return (
    <>
      <Header page="movie"></Header>
      <main className="page">
        <SearchForm
          onSubmit={searchResult}
          isLoading={isLoading}
        ></SearchForm>
        <MoviesCardList
          onCardSave={onCardSave}
          savedMovies={savedMovies}
          error={error}
          isLoading={isLoading}
          foundMovies={foundMovies}
          movies={movies}
          updateMoviesList={updateMoviesList}
        ></MoviesCardList>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Movies;