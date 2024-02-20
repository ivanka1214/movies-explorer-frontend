import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import useResize from "../../utils/useResize";

function Movies({
  movies,
  onSearch,
  isLoading,
  error,
  onCardSave,
  savedMovies,
}) {
  const [foundMovies, setFoundMovies] = useState([]);
  const [isMovies, setIsMovies] = useState();
  const [isFilterOn, setFilterOn] = useState();
  const [searchError, setSearchError] = useState(false);

  const size = useResize();

  useEffect(() => {
    searchResult();
  }, [movies, isFilterOn]);

  useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
      setIsMovies(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("checkbox")) {
      setFilterOn(true);
    }
  }, []);

  function handleSearch() {
    setSearchError(false);
    if (movies.length > 0) {
      setIsMovies(true);
      searchResult();
    } else {
      setIsMovies(true);
      onSearch();
    }
  }

  function handleFilter(value) {
    setFilterOn(value);
    if (value === false) {
      localStorage.removeItem("checkbox");
    }
  }

  function searchResult() {

    if (isFilterOn) {
      const shortMovies = movies.filter((item) => {
        return item.duration < 40;
      });

      const shortMoviesResult = shortMovies.filter((item) => {
        return (
          item.nameRU.toLowerCase().includes(localStorage.getItem("request")) ||
          item.nameEN.toLowerCase().includes(localStorage.getItem("request"))
        );
      });

      setFoundMovies(shortMoviesResult);
      localStorage.setItem("foundMovies", JSON.stringify(shortMoviesResult));

      if (shortMoviesResult.length === 0) {
        setSearchError(true);
      } else {
        setSearchError(false);
      }
    } else if (isMovies) {
      const searchResult = movies.filter((item) => {
        return (
          item.nameRU.toLowerCase().includes(localStorage.getItem("request")) ||
          item.nameEN.toLowerCase().includes(localStorage.getItem("request"))
        );
      });

      setFoundMovies(searchResult);
      localStorage.setItem("foundMovies", JSON.stringify(searchResult));

      if (searchResult.length === 0) {
        setSearchError(true);
      } else {
        setSearchError(false);
      }
    }
  }

  function searchShort() {
    const shortMoviesResult = foundMovies.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(localStorage.getItem("request")) ||
        item.nameEN.toLowerCase().includes(localStorage.getItem("request"))
      );
    });
    setFoundMovies(shortMoviesResult);
  }
  return (
    <>
      <Header page="movie"></Header>
      <main className="page">
        <SearchForm
          onSubmit={handleSearch}
          shortMovies={handleFilter}
          isLoading={isLoading}
        ></SearchForm>
        <MoviesCardList
          onCardSave={onCardSave}
          savedMovies={savedMovies}
          searchError={searchError}
          error={error}
          isLoading={isLoading}
          foundMovies={foundMovies}
          movies={movies}
        ></MoviesCardList>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Movies;