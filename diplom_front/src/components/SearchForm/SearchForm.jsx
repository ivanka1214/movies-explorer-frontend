import React from "react";
import search from "../../images/icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";
import useResize from "../../utils/useResize";

function SearchForm({
  onSubmit,
  isLoading,
  requestParamName,
  checkboxParamName,
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const size = useResize();

  useEffect(() => {
    setError("");
  }, [value]);

  useEffect(() => {
    inputValue();
  }, []);

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    if (value === "") {
      setError("Нужно ввести ключевое слово");
    } else {
      localStorage.setItem(requestParamName, value.toLowerCase());
      setError("");
      onSubmit(value.toLowerCase());
    }
  }

  function shortMoviesSearch(value) {
    if (value === false) {
      localStorage.removeItem(checkboxParamName);
    }
    handleSubmit();
  }

  function inputValue() {
    const localStorageRequest = localStorage.getItem(requestParamName);
    if (localStorageRequest) {
      setValue(localStorageRequest);
    }
  }

  return (
    <section className="serach-form__container">
      <div className="search">
        <img src={search} alt="поиск" className="search__icon"></img>
        <form
          className="search__form"
          onSubmit={handleSubmit}
        >
          <input
            disabled={isLoading}
            onChange={(e) => setValue(e.target.value)}
            id="movie"
            className="search__input"
            placeholder="Фильм"
            type="text"
            name="movie"
            value={value}
            // required
            // minLength="2"
            // maxLength="40"
          />
          <div className="search__button">
            <div className="search__submit_container">
              <button
                disabled={isLoading}
                className="search__submit"
                type="submit"
              >
                Найти
              </button>
            </div>
            {size > 630 ? (
              <FilterCheckbox
                shortMovies={shortMoviesSearch}
                checkboxParamName={checkboxParamName}
                class="search_checkbox"
              ></FilterCheckbox>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
      <span className="search-form__span">{error ?? ""}</span>
      {size <= 630 ? (
        <FilterCheckbox
          shortMovies={shortMoviesSearch}
          checkboxParamName={checkboxParamName}
          class="checkbox-separeted"
        ></FilterCheckbox>
      ) : (
        ""
      )}
    </section>
  );
}
export default SearchForm;
