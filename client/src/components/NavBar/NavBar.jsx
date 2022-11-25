import React from 'react';
import s from './navBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import {NavLink} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {getAllVideogames} from '../../Redux/Actions';
// import { filtrarPorTres } from '../../Redux/Actions';
import logo from '../../assets/animeGirlPresentando2.png';


const NavBar=()=> {
  const dispatch= useDispatch();
  
  const handleClick=(e)=>{
    e.preventDefault();
    dispatch(getAllVideogames());
  };

  // const handleReload = () => {
  //   window.location.reload();
  // };

  // const handlePorTres=(e)=>{
  //   e.preventDefault();
  //   dispatch(filtrarPorTres());
  //   console.log(e)
  // }


  return (
    <React.Fragment>
      
      <nav className={s.navBar}>
          <img src={logo} alt="logoGames" className={s.logo}/>
        <div className={s.buttonsContainer}>
          <NavLink to="/home"><button className={s.homeButton}>🏠Home</button></NavLink>
          <NavLink to ="/addgame"><button className={s.homeButton}> Create Game</button></NavLink>
          <button className={s.homeButton} onClick={(e)=>handleClick(e)}>Refresh</button>
          <NavLink to="/"><button className={s.homeButton}>Back</button></NavLink>

          {/* <button  className={s.homeButton} onClick={(e)=>handlePorTres(e)}>3 Genres Games</button> */}
          
          <div className={s.inline}><SearchBar/></div>
          <div>
            <h3 className={s.h3}>"By crossing this small border between the real world and the game world <br/> has the result that during the game one is relaxed and can escape from <br/>the real world and then return relaxed and happy"</h3>
            <h3 className={s.h3_2}>Wolfgang Kramer</h3>
            <h3 className={s.h3_3}>What is a game for you?...</h3>
          </div>

        </div>
      </nav>
     
    </React.Fragment>
  )
}

export default NavBar;
