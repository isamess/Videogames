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
          <option>Order by...</option>
          <option value="ALL">All Games</option>
          <option value="A-Z">A to Z</option>
          <option value="Z-A">Z to A</option>
          <option value="ASC"> Higher Ratings</option>
          <option value="DESC">Lower Ratings</option>
          <option value="API">API Games</option>
          <option value="DB">Created Games</option>
        </select>
      </div>
      <div className={s.box}>
        <select  name="filters" onChange={handleGenres}>
          <option >
            Filter by...
          </option>
          <option value="ALL">All</option>
          {genres && genres.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))}
        </select>
      </div>
    </div>
  </React.Fragment>
  )
}

export default Filters
