import React from "react";
import { useRef } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import account from '../../images/icon__account.svg'

function Navigation() {

    const location = useLocation();

    function isMain() {
        if (location.pathname === '/') {
            return true
        } else {
            return false
        }

    }

    const navRef = useRef()

    function shawNavBar() {
        navRef.current.classList.toggle("navbar__opened");
    }

    return (
        <section>
            {isMain() ?
                <nav>
                    <NavLink to="/signup" replace className="menu__registration">Регистрация</NavLink>
                    <NavLink to="/signin" replace className="menu__signin">Войти</NavLink>
                </nav>
                :
                <div>
                    <nav ref={navRef} className="menu__navbar">
                        <div className="menu__navbar-block">
                            <button onClick={shawNavBar} className="menu__close-btn menu__btn"></button>
                            <div className="menu__links">
                                <NavLink to="/" replace className={`menu__link menu__link_main ${location.pathname === '/' ? `menu__here` : ``}`}>Главная</NavLink>
                                <NavLink to="/movies" replace className={`menu__link ${location.pathname === '/movies' ? `menu__here` : ``}`}>Фильмы</NavLink>
                                <NavLink to="/saved-movies" replace className={`menu__link ${location.pathname === '/saved-movies' ? `menu__here` : ``}`}>Сохраненные фильмы</NavLink>
                            </div>
                            <NavLink to="/profile" replace className="menu__link menu__link_account">
                                <p className="account-link">Аккаунт</p>
                                <div className="menu-account-btn-box">
                                    <img src={account} alt='иконка' className="menu__account-btn"></img>
                                </div>
                            </NavLink>
                        </div>
                    </nav>
                    <button onClick={shawNavBar} className="menu__btn menu__open-btn"></button>
                </div>
            }
        </section>
    )
}

export default Navigation;