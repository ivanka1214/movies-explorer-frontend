import React from "react";
import pic from "../../images/pic__COLOR_landing-logo.svg";
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__picture ">
        <img className="promo__image" src={pic} alt="картинка" />
        <h1 className="promo__text">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <NavTab></NavTab>
    </section>
  );
}

export default Promo;
