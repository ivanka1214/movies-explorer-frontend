import React from "react";

function Footer() {
  return (
    <footer className="footer page">
      <h6 className="footer__header">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h6>
      <div className="footer__block">
        <p className="footer__year">© 2024</p>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link"
              target="blank"
              href="https://practicum.yandex.ru/"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              target="blank"
              href="https://github.com/ivanka1214"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
