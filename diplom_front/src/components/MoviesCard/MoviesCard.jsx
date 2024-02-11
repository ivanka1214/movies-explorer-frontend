import React from 'react';

function MoviesCard(props) {
    return (
        <section className='card'>
            <img src={props.image} className='card__image' alt='обложка'/>
            <button className='card__save'>Сохранить</button>
            <button className='card__save_active'></button>
            <button className='card__save_delete'></button>
            <div className='card__block'>
                <h3 className='card__subtitle'>{props.name}</h3>
                <p className='card__time'>{props.time}</p>
            </div>
        </section>

    )
}

export default MoviesCard;