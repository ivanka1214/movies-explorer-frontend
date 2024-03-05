import React from "react";
function FilterCheckbox({checkboxParamName, shortMovies, className, checkbox}) {

  function filter(value) {
    localStorage.setItem(checkboxParamName, value);
    return shortMovies(value);
  }

  return (
    <section className={`${className}`}>
      <input
        className="checkbox-invisible"
        onChange={(e) => filter(e.target.checked)}
        type="checkbox"
        name="short-movie"
        id="short-movie"
        defaultChecked={checkbox === 'true'}
      ></input>
      <span className="checkbox-visible"></span>
      <span className="text-checkbox">Короткометражки</span>
    </section>
  );
}

export default FilterCheckbox;
