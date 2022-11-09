import React from 'react';
import s from './error404.module.css';
import error from '../../assets/game-over-joystick.jpg';
import {Link} from 'react-router-dom';




const Error404 = () => {
return (
<React.Fragment>
        <div className={s.error}>

<div className={s.blank}>&nsbp;</div>
<div className={s.nohay}>
<img src={error} alt='Error404'/>


<div  className={s.texto} >
<h1>Ops!</h1>
</div>
</div>

<div className={s.Btn}>
<Link to='/home'><button>Home</button></Link>
</div>
</div>
</React.Fragment>
)
}

export default Error404;
