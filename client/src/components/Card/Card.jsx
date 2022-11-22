import React from 'react';
import s from './card.module.css';


const Card = ({name, image, genres, rating }) => {

return (
    <React.Fragment>
        <div className={s.cardContainer}>
    <div className={s.card} >
    <img className={s.imgcard} src={image} alt={name} />
    <div className={s.cardinfo}>
        <h3 className={s.nametxt}>{name}</h3>
    <div className={s.cardrating}>{rating}</div>
    <div className={s.cardinfotext}>
        <p className={s.textOverflow}>
        {genres.join(" - ")}
        </p>

    </div>
    </div>
    </div>
        </div>
    </React.Fragment>
)
}

export default Card;
