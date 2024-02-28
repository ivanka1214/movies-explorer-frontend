import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
function FilterCheckbox(props) {
  // const location = useLocation();
  useEffect(() => {
    if (
      // location.pathname === "/movies" &&
      localStorage.getItem("checkbox", "true")
    ) {
      document.getElementById("short-movie").checked = true;
    } else {
      document.getElementById("short-movie").checked = false;
    }
  }, []);

  function filter(value) {
    // if (location.pathname === "/movies") {
      localStorage.setItem("checkbox", value);
    // }
    return props.shortMovies(value);
  }

  return (
    <section className={`${props.class}`}>
      <input
        className="checkbox-invisible"
        onChange={(e) => filter(e.target.checked)}
        type="checkbox"
        name="short-movie"
        id="short-movie"
        value="short-movie"
      ></input>
      <span className="checkbox-visible"></span>
      <span className="text-checkbox">Короткометражки</span>
    </section>
  );
}

export default FilterCheckbox;
