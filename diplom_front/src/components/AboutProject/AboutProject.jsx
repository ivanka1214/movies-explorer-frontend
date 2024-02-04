import React from "react";

function AboutProject(){
    return(
        <section className="project" id="project">
            <h2 className="project__header subtitle">О проекте</h2>
            <div className="project__first">
                <h4 className="first__header first__header-parts">Дипломный проект включал 5 этапов</h4>
                <h4 className="first__header first__header-weeks">На выполнение диплома ушло 5 недель</h4>
                <p className="first__point">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="first__point">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="project__second">
                <p className="second__point_first-column">1 неделя</p>
                <p className="second__point_second-column">4 недели</p>
                <p className="second__point">Back-end</p>
                <p className="second__point">Front-end</p>
            </div>

        </section>

    )
}

export default AboutProject;