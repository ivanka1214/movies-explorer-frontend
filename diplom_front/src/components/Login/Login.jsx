import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../utils/Validation";

function Login(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(values);
  }
  return (
    <main className="page">
      <section className="form_section">
        <Link to="/" replace>
          <img src={logo} alt="логотип" className="form__logo"></img>
        </Link>
        <h1 className="form__subtitle">Рады видеть!</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__block">
            <label className="form__label">E-mail</label>
            <input
              className={`form__input ${!isValid && "form__input_type_error"}`}
              onChange={handleChange}
              id="login-email"
              type="email"
              name="email"
              minLength="2"
              maxLength="40"
              placeholder="e-mail"
              required
            ></input>
            <span className="form__span">{errors.name ?? ""}</span>
            <label className="form__label">Пароль</label>
            <input
              className={`form__input ${!isValid && "form__input_type_error"}`}
              onChange={handleChange}
              id="login-password"
              type="password"
              name="password"
              minLength="2"
              maxLength="200"
              placeholder="password"
              required
            ></input>
            <span className="form__span">{errors.password ?? ""}</span>
          </div>
          <span className="form__error">{props.error ?? ""}</span>
          <button
            type="submit"
            disabled={!isValid}
            className={`form__submit ${
              !isValid && "form_notvalid"
            } login__submit`}
          >
            Войти
          </button>
          <p className="form__question">
            Ещё не зарегистрированы?
            <Link to="/signup" replace className="form__link">
              Регистрация
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
