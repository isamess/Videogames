import React from 'react';
import s from './loading.module.css';

 // import loading from './loadingTransp.gif'

const Loading = () => {
    const handleReload = () => {
        window.location.reload();
      };

    return (
        <div className={s.container}>
            <div className={s.carga}></div>
            <div ><button className={s.refresh} onClick={()=>handleReload()}>Refresh</button></div>
            <div className={s.loadingTitle}> <h1 >Loading...</h1> </div>
          
        </div>
    
    )
}

export default Loading;
