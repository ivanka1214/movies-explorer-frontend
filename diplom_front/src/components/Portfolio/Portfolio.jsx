import React from 'react';


function Portfolio() {
    return (
        <section>
            <h4 className="portfolio">Портфолио</h4>
            <a className="portfolio__link" target='blank' href='https://github.com/ivanka1214' >
                <p className="portfolio__text">Статичный сайт</p>
                <p className="portfolio__point">&#8599;</p>
            </a>
            <a className="portfolio__link" target="blank" href="https://github.com/ivanka1214">
                <p className="portfolio__text">Адаптивный сайт</p>
                <p className="portfolio__point">&#8599;</p>
            </a>
            <a className="portfolio__link" target="blank" href="https://github.com/ivanka1214">
                <p className="portfolio__text">Одностраничное приложение</p>
                <p className="portfolio__point">&#8599;</p>
            </a>
        </section>

    )
}

export default Portfolio;