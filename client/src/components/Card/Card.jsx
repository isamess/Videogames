import React from 'react';
import s from './card.module.css';




const Card = (props) => {

return (
    <React.Fragment>
        <div className={s.cardContainer}>
    <div className={s.card} >
    <img className={s.imgcard} src={props.image} alt={props.name} />
    <div className={s.cardinfo}>
        <h3 className={s.nametxt}>{props.name}</h3>
    <div className={s.cardrating}>
        {props.rating}
    </div>
    <div className={s.cardinfotext}>
        <span className={s.genrestxt}>{props.genres?.join(" - ")}</span>
    </div>
    </div>
    </div>
        </div>
    </React.Fragment>
)
}

export default Card;
