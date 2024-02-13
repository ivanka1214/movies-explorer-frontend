import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <header className={`header ${props.page}-header`}>
      <Link replace to="/">
        <img className="header__logo" src={logo} alt="логотип" />
      </Link>
      <div className="header__block">
        <Navigation></Navigation>
      </div>
    </header>
  );
}

export default Header;
