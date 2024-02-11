import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg'

function Register() {
    return (
        <main className='page'>
            <section className='form_section'>
                <Link to='/' replace ><img src={logo} alt='логотип' className='form__logo'></img></Link>
                <h1 className='form__subtitle'>Добро пожаловать!</h1>
                <form className='form'>
                    <div className='form__block'>
                        <label className='form__label'>Имя</label>
                        <input className='form__input' id='register-name' type='text' required name='name' minLength="2" maxLength="40" placeholder='имя'></input>
                        <span className='form__span'></span>
                        <label className='form__label'>E-mail</label>
                        <input className='form__input' id='register-email' type='email' required name='email' minLength='2' maxLength='40' placeholder='e-mail'></input>
                        <span className='form__span'></span>
                        <label className='form__label'>Пароль</label>
                        <input className='form__input' id='register-password' type='password' required name='password' minLength="2" maxLength="200" placeholder='password'></input>
                        <span className='form__span'>Что-то пошло не так...</span>
                    </div>
                    <button type='submit' className='form__submit'>Зарегистрироваться</button>
                    <p className='form__question'>Уже зарегистрированы?<Link to="/signin" replace className="form__link"> Войти</Link></p>
                </form>
            </section>
        </main>
    )
}

export default Register;