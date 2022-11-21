import React from 'react';
import { Link } from 'react-router-dom';
import s from './landingPage.module.css';

const LandingPage = () => {
    return (
        <div className={s.fondo}>
        <div className={ s.flex}>
        <div className= {s.alig}>
            <h1>  Welcome to the <br/> Marvellous<br/>Videogame's World</h1>
            <Link to='/home'>
            <span><button className={s.boton}>Home</button></span>
            </Link>
        </div>

        </div>
    </div>
    )
}

export default LandingPage
