import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({ savedMovies, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [isFilterOn, setFilterOn] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  function handleSubmit(value) {
    setSearchQuery(value.toLowerCase());
    if (isFilterOn) {
      const shortSavedFilteredMovies = filteredMovies.filter((item) => {
        return (
          item.nameRu.toLowerCase().includes(value) ||
          item.nameEn.toLowerCase().includes(value)
        );
      });

      setFilteredMovies(shortSavedFilteredMovies);

      if (shortSavedFilteredMovies.length === 0) {
        setSearchError(true);
      } else {
        setSearchError(false);
      }
    } else {
      const filteredSavedMovies = savedMovies.filter((item) => {
        return (
          item.nameRu.toLowerCase().includes(value) ||
          item.nameEn.toLowerCase().includes(value)
        );
      });
      setIsSearched(true);

      setFilteredMovies(filteredSavedMovies);

      if (filteredSavedMovies.length === 0) {
        setSearchError(true);
      } else {
        setSearchError(false);
      }
    }
  }

  function shortSavedMoviesSearch(value) {
    setSearchError(false);
    setFilterOn(value);
    
    if (value === true) {
      let filteredResults;
      if (isSearched) {
        filteredResults = savedMovies.filter((item) => {
          return (
            item.duration < 40 &&
            (item.nameRu.toLowerCase().includes(searchQuery) || item.nameEn.toLowerCase().includes(searchQuery))
          );
        });
      } else {
        filteredResults = savedMovies.filter((item) => {
          return item.duration < 40;
        });
      }
      setFilteredMovies(filteredResults);
    } else {
      if (isSearched) {
        const filteredResults = savedMovies.filter((item) => {
          return (
            item.nameRu.toLowerCase().includes(searchQuery) ||
            item.nameEn.toLowerCase().includes(searchQuery)
          );
        });
        setFilteredMovies(filteredResults);
      } else {
        setFilteredMovies(savedMovies);
      }
    }
  }

  function updateMoviesList(card) {
    if (isSearched) {
      const newArrey = filteredMovies.filter((i) => i._id !== card._id);
      setFilteredMovies(newArrey);
    }
  }

  return (
    <>
      <Header page="movie"></Header>
      <main className="page">
        <SearchForm
          onSavedMoviesSubmit={handleSubmit}
          shortSavedMoviesSearch={shortSavedMoviesSearch}
        ></SearchForm>
        <MoviesCardList
          savedMovies={isSearched ? filteredMovies : savedMovies}
          searchError={searchError}
          onCardDelete={onCardDelete}
          updateMoviesList={updateMoviesList}
        ></MoviesCardList>
      </main>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
