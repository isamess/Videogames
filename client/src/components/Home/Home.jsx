import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllVideogames, getGamesGenre, getPlatforms} from '../../Redux/Actions'
import Card from '../Card/Card.jsx';
import {Link} from 'react-router-dom';
import s from './home.module.css';
import Pagination from '../Pagination/Pagination.jsx';
import Filters from '../Filters/Filters.jsx'
import NavBar from '../NavBar/NavBar';
import Loading from '../Loading/Loading';


const Home = () => {
  //TODO: local states
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);

//TODO: dispatchs/states
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const filteredGames = useSelector((state) => state.filteredGames);

  const [posts, setPosts] = useState(videogames);
  //Filters
  const orderBy = useSelector((state) => state.orderedBy);
  const filteredBy = useSelector((state) => state.filteredBy);

//Paginate
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = currentpage => setCurrentPage(currentpage);


  useEffect(() => {
    if (!videogames.length) {
      dispatch(getAllVideogames());
      dispatch(getGamesGenre());
      dispatch(getPlatforms());
    }
  }, [dispatch, videogames]);

  useEffect(() => {
    if (filteredBy === "ALL" ) {
      setPosts(videogames);
    } else {
      setPosts(filteredGames);
    }
    setCurrentPage(1);
  }, [videogames, filteredGames, filteredBy, orderBy]);

  useEffect(() => {
    if ( orderBy === "ALL") {
      setPosts(videogames);
    } else {
      setPosts(filteredGames);
    }
    setCurrentPage(1);
  }, [videogames, filteredGames, filteredBy, orderBy]);


  return (
    <React.Fragment>
      <div className={s.background}>
        <NavBar/>
        <Filters />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          setCurrentPage={setCurrentPage}
          paginate={paginate}
        />

        {
          currentPosts.length > 0 ?
          (
            <div className={s.container}>
            {currentPosts.map((game) => (
              <div key={game.id}>
                <Link to={`/videogame/${game.id}`} className={s.linkcard}>
                  <Card
                    key={game.id}
                    id={game.id}
                    image={game.image}
                    name={game.name}
                    rating={game.rating}
                    genres={game.genres}
                  />
                </Link>
              </div>
            ))}
          </div>

          ):(<div> <Loading/></div>)
        }

          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          setCurrentPage={setCurrentPage}
        />


      </div>
    </React.Fragment>
  )}

export default Home;
