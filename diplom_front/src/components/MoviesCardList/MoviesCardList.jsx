import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import conf from '../../utils/conf';

function MoviesCardList(props){
    return(
        <section className='movies_block'>
            <div className='movies_list'>
            {conf.map((card) => {
                return (
                <MoviesCard key={card.name} name={card.name} image={card.image} time={card.time}></MoviesCard>
                )
            })}
            </div>
            <button className={`movies_list__button ${props.class}`} type='submit'>Ещё</button>
        </section>
    )
}

export default MoviesCardList;