import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <>
            <Header page="movie page"></Header>
            <main className='page'>
                <section className='profile'>
                    <h1 className='profile__hello'>Привет, Антон</h1>
                    <form className='profile__info'>
                        <div className='profile__name'>
                            <p className='profile__label'>Имя</p>
                            <input className='profile__input' id="profile-name"  type="text" name="profile-name" minLength="2" maxLength="40" placeholder='Антон'></input>
                        </div>
                        <div className='profile__email'>
                            <p className='profile__label'>E-mail</p>
                            <input className='profile__input' id="profile-email"  type="text" name="profile-email" minLength="2" maxLength="40" placeholder='ab.an.ev@yandex.ru'></input>
                        </div>
                    </form>
                    <button type='submit' className='profile__button'>Редактировать</button>
                    <Link to='/' replace className='profile__exit'>Выйти из аккаунта</Link>
                </section>
            </main>
        </>

    )
}

export default Profile;