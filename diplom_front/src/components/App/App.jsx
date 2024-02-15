import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { useFormWithValidation } from "../../utils/Validation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundError from "../NotFoundError/NotFoundError";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMovies, setIsMovies] = useState(false);
  const [answer, setAnswer] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { resetForm } = useFormWithValidation();

  useEffect(() => {
    checkToken();
    getSavedMovies();
    if (localStorage.getItem("foundMovies")) {
      setIsMovies(true);
    }
  }, []);

  function handleLogin({ email, password }) {
    mainApi
      .login({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          setLoggedIn(true);
          getSavedMovies();
          setCurrentUser(data.data);
          navigate("/movies", { replace: true });
          resetForm();
        }
      })
      .catch((error) => {
        setLoginError(error);
      });
  }

  function handleRegisterButton({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        resetForm();
      })
      .catch((error) => {
        setRegisterError(error);
      });
  }

  function handleProfileButton({ name, email }) {
    mainApi
      .changeUserInfo({ name, email })
      .then((data) => {
        setCurrentUser(data);
        setAnswer(true);
        checkToken();
      })
      .catch((error) => {
        setProfileError(error);
      });
  }

  function getMovies() {
    setConnectionError(false);
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(movies);
        setIsLoading(false);
        setIsMovies(true);
      })
      .catch((error) => {
        setConnectionError(true);
        console.log(error);
        setIsLoading(false);
      });
  }

  function handleSaveCard(card) {
    const savedMovie = savedMovies.find((item) => item.movieId === card.id);
    savedMovie
      ? handleDeleteCard(savedMovie)
      : mainApi
          .saveMovie(card)
          .then((data) => {
            setSavedMovies((savedMovies) => [...savedMovies, data]);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
  }

  function handleDeleteCard(card) {
    mainApi
      .deleteMovie(card._id)
      .then(() => {
        getSavedMovies();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkToken() {
    const path = location.pathname;
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getUser(token)
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
          navigate(path);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/", { replace: true });
    setMovies([]);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main isLoggedIn={loggedIn}></Main>}></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                isMovies={isMovies}
                savedMovies={savedMovies}
                error={connectionError}
                onCardSave={handleSaveCard}
                movies={movies}
                isLoading={isLoading}
                onSearch={getMovies}
              />
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
                onCardDelete={handleDeleteCard}
                savedMovies={savedMovies}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                answer={answer}
                signOut={signOut}
                handleProfileButton={handleProfileButton}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <ProtectedRouteElement
                loggedIn={!loggedIn}
                element={Register}
                error={registerError}
                handleRegister={handleRegisterButton}
              ></ProtectedRouteElement>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <ProtectedRouteElement
                loggedIn={!loggedIn}
                element={Login}
                error={loginError}
                handleLogin={handleLogin}
              ></ProtectedRouteElement>
            }
          ></Route>
          <Route path="*" element={<NotFoundError></NotFoundError>}></Route>
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
