import React from 'react';

function FilterCheckbox(props){
    return(
    <section className={`${props.class}`}>
        <input className="checkbox-invisible" type="checkbox" name="short-movie" id="short-movie" value="short-movie"></input>
        <span className="checkbox-visible"></span>
        <span className="text-checkbox">Короткометражки</span>
    </section>
    )
}

export default FilterCheckbox;