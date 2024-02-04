import React from 'react';
import search from '../../images/icon.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className='serach-form__container'>
            <div className='search'>
                <img src={search} alt='поиск' className='search__icon'></img>
                <form className='search__form'>
                    <input id="movie" className="search__input" placeholder="Фильм"
                        type="text" name="movie" required minLength="2" maxLength="40" />
                    <div className='search__button'>
                        <div className='search__submit_container'>
                            <button className='search__submit' type='submit'>Найти</button>
                        </div>
                        <FilterCheckbox class='search_checkbox'></FilterCheckbox>
                    </div>
                </form>
            </div>
            <FilterCheckbox class='checkbox-separeted'></FilterCheckbox>
        </section>

    )
}
export default SearchForm;