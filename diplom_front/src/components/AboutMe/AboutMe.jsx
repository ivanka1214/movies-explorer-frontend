import React from "react";
import photo from "../../images/photo.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about" id="about">
      <h2 className="subtitle">Студент</h2>
      <div className="about__container">
        <div className="about__info">
          <h3 className="about__info_name">Антон</h3>
          <p className="about__info_job">Фронтенд-разработчик, 25 лет</p>
          <p className="about__info_about">
            По первому высшему образованию я специалист по ИБ, а сейчас работаю
            веб-разработчиком. Решил подтянуть свои знания в этой области.
          </p>
          <a
            href="https://github.com/ivanka1214"
            target="blank"
            className="about__github"
          >
            Github
          </a>
        </div>
        <img className="about__img" src={photo} alt="студент" />
      </div>
      <Portfolio></Portfolio>
    </section>
  );
}

export default AboutMe;
