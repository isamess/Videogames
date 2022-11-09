import React from 'react';
import s from './loading.module.css';
// import loading from './loadingTransp.gif'

const Loading = () => {
    return (
        <div className={s.container}>
        <div className={s.carga}></div>
        <h1 className={s.loadingTitle}>Loading...</h1>
        </div>
    
    )
}

export default Loading;
