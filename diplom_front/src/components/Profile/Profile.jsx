import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import { useFormWithValidation } from '../../utils/Validation';

function Profile(props) {
    const user = useContext(CurrentUserContext);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [isButton, setIsButton] = useState(false);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, [user]);

    const { values, handleChange, handleValue, errors, isValid } = useFormWithValidation();
    console.log(isValid)

    function handleNameChange(e) {
        handleChange(e);
        setName(e.target.value);

        handleValue(e, user.name);
    }

    function handleEmailChange(e){
        handleChange(e);
        setEmail(e.target.value);
        handleValue(e, user.email);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('ok')
        setIsButton(true);

        props.handleProfileSubmit(values);

    }
  return (
    <>
    <Header page="movie page"></Header>
    <main className='page'>
        <section className='profile'>
            <h1 className='profile__hello'>Привет, {user.name}</h1>
            <form className='form profile__form' onSubmit={handleSubmit}>
                <div className='profile__info'>
                    <div className='profile__name'>
                        <p className='profile__label'>Имя</p>
                        <input className={`profile__input ${errors.length > 0 ? 'form__input_type_error' : ''}`} onChange={handleNameChange} id="profile-name" placeholder='имя' type="name" value={name ?? ''} name="name" minLength="2" maxLength="100" pattern='[A-Za-zА-Яа-яЁё\-\s]+$'></input>
                    </div>
                    <span className={`form__span ${!isValid && 'form__span_type_visible'}`}>{errors.name ?? ''}</span>
                    <div className='profile__email'>
                        <p className='profile__label'>E-mail</p>
                        <input className={`profile__input ${errors.length > 0 ? 'form__input_type_error' : ''}`} onChange={handleEmailChange} id="profile-email" pattern='\S+@\S+\.\S+' value={email ?? ''} placeholder='email' type="email" name="email" minLength="2" maxLength="100"></input>
                    </div>
                    <span className={`form__span ${!isValid && 'form__span_type_visible'}`}>{errors.email ?? ''}</span>
                </div>
                {props.answer ?
                    <span className='profile__span'>Данные профиля обновлены</span>
                    : ''}
                <button disabled={!isValid} type='submit' className={`profile__change-button ${!isValid && 'profile__form_type_notvalid'}`}>Редактировать</button>
            </form>
            <button onClick={props.signOut} className='profile__exit'>Выйти из аккаунта</button>
        </section>
    </main>
</>
  );
}

export default Profile;
