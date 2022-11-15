import React  from 'react';
import s from './navBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAllVideogames, filtrarPorTres } from '../../Redux/Actions';




const NavBar=()=> {
  const dispatch= useDispatch();
  
  const handleClick=(e)=>{
    e.preventDefault();
    dispatch(getAllVideogames());
    
  };
  const handlePorTres=(e)=>{
    e.preventDefault();
    dispatch(filtrarPorTres());
    console.log(e)
  }


  return (
 <nav className={s.navBar}> 
  <ul className={s.ulnav}>
    <li className={s.linav}><Link to='/home'className={s.navitem} ><span>🏠Home</span></Link></li>
    <li className={s.linav}><Link to='/addgame' className={s.navitem}><span>Create Game</span></Link></li>
    <button className={s.navitem} onClick={(e)=>handleClick(e)}>Refresh</button>

    <button  className={s.navitem} onClick={(e)=>handlePorTres(e)}>3 Genres Games</button>
    <SearchBar/>
    {/* <li className='li-nav'><Link className='nav-item' to='About'> 💻About</Link></li> */}

    <Link to='/'><span><button className={s.back}>Back</button></span></Link>

  </ul> 
  </nav>
  )
}

export default NavBar;
