import React, {useEffect} from 'react';
import s from './filters.module.css';
import { filterGenres, getGamesGenre, orderFilter } from '../../Redux/Actions';
import {useDispatch, useSelector} from 'react-redux';



const Filters = () => {
    const dispatch= useDispatch()
    const genres = useSelector((state) => state.genres);

    useEffect(() => {
      dispatch(getGamesGenre());
    }, [dispatch]);

    function handleChange(e) {
      e.preventDefault();
      dispatch(orderFilter(e.target.value));
    }

  function handleGenres(e) {
    e.preventDefault();
    dispatch(filterGenres(e.target.value));
  }

  return (
  <React.Fragment>
     <div className={s.container}>
      <div className={s.box}>
        <select  onChange={handleChange}> Orders
          <option key="order">Order by...</option>
          <option key="all" value="ALL">All Games</option>
          <option key="az" value="A-Z">A to Z</option>
          <option key="za" value="Z-A">Z to A</option> 
          <option key="asc"value="ASC"> Higher Ratings</option>
          <option key="dsc" value="DESC">Lower Ratings</option>
         
        
        </select>
      </div>
      <div className={s.box}>
        <select name="apiGames" onChange={handleChange}>
          <option key="api" value="API">API Games</option>
        </select>
        <select name="DbGames" onChange={handleChange}>
          <option key="db" value="DB">Created Games</option>
        </select>
        <select  name="filters" onChange={handleGenres}>
          <option  key="filter" >
            Genres...
          </option>
          <option  key="allgames" value="ALL">All</option>
          {genres && genres.map((g) => (
            <option   value={g.name}>{g.name}</option>
          ))}
        </select>
      </div>
    </div>
  </React.Fragment>
  )
}

export default Filters
