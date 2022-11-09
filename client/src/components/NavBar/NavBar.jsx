import React  from 'react';
import s from './navBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAllVideogames } from '../../Redux/Actions';



const NavBar=()=> {
  const dispatch= useDispatch();

  const handleClick=(e)=>{
    e.preventDefault();
    dispatch(getAllVideogames());
  };

  return (
 <nav className={s.navBar}> 
  <ul className={s.ulnav}>
    <li className={s.linav}><Link to='/home'className={s.navitem} ><span>🏠Home</span></Link></li>
    <li className={s.linav}><Link to='/addgame' className={s.navitem}><span>Create Game</span></Link></li>
    <button  className={s.navitem} onClick={(e)=>handleClick(e)}>Refresh</button>
    <SearchBar/>
    {/* <li className='li-nav'><Link className='nav-item' to='About'> 💻About</Link></li> */}
    <Link to="/"> <button className={s.back}>BACK</button></Link>
  </ul> 
  </nav>


  )
}

export default NavBar



// const NavBar = (setCurrentPage) => {
//   const [showLinks, setShowLinks] = useState(false);
    
//   return (
//     <React.Fragment>
//       <div className={s.Navbar}>
//         <div className={s.leftSide}>
//         <div className={s.home} id={showLinks ? "hidden" : ""}>
//             <a href="/home">Home</a>
//             <br/>
//             <a href="/addgame">Add game</a>
//           </div>
//           <button onClick={() => setShowLinks(!showLinks)}>
//           </button>
//         </div>
//         <div className={s.rightSide}></div>
//         <SearchBar  />
//       </div>
//     </React.Fragment>
//   )
// }

// export default NavBar;
