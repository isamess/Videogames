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
    <div className={s.cardinfotext}>{genres.join(" - ")}
        {/* <span>{genres && genres.map((e) => {return(<div key={e}>{e}</div>)})}</span> */}

       {/* <span className={s.genrestxt}>{genres?.join(" - ")}</span> */}
        {/* <span className={s.genrestxt}>{props.genres? props.genres.map((g)=>(typeof g === "object"? g.name: g) ).join("-"): props.genres.join("-")}</span> */}
        
        {/* <span className={s.genrestxt}>{genres? genres.map((g)=>g.name +"-"): props.genres}</span> */}

        {/* <span className={s.genrestxt}>{genres?.map((g)=>g.name).join("-")}</span>  */}

    </div>
    </div>
    </div>
        </div>
    </React.Fragment>
)
}

export default Card;
