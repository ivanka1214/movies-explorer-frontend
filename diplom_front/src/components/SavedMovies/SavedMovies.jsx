import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
    return (
        <>
            <Header page="movie"></Header>
            <main className='page'>
                <SearchForm></SearchForm>
                <MoviesCardList class='hidden'></MoviesCardList>
            </main>
            <Footer></Footer>
        </>

    )
}

export default SavedMovies;