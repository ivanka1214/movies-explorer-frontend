import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundError() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-3);
  }
  return (
    <section className="error">
      <div className="error__name">
        <h1 className="error__number">404</h1>
        <p className="error__text">Страница не найдена</p>
      </div>
      <button className="error__return" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default NotFoundError;
