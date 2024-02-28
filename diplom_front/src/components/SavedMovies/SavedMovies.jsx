import React from "react";
import Movies from "../Movies/Movies";

function SavedMovies(params) {
  return (
    <Movies {...params} movies={params.savedMovies} />
  );
}

export default SavedMovies;
