import React from "react";

function NavTab(){
    return(
        <nav className="tab">
            <a href="#project" className="tab__link">О проекте</a>
            <a href="#technologies" className="tab__link">Технологии</a>
            <a href="#about" className="tab__link">Студент</a>
        </nav>
    )
}

export default NavTab;