import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailId, cleanDetail, getPlatforms} from '../../Redux/Actions';
import { useParams, Link} from "react-router-dom";
import s from './detail.module.css';




const Detail = () => {
    const dispatch = useDispatch();
    
    const {id} = useParams();
    const game = useSelector(state => state.videogameDetail)
    const platforms= useSelector(state=>state.platforms)


    useEffect(()=>{
        dispatch(getDetailId(id))
        return () => dispatch(cleanDetail(id));
    },[dispatch,id])
    console.log(game);

    useEffect(()=>{
        dispatch(getPlatforms())
    },[dispatch])
    console.log(platforms)

    var regex = /(<([^>]+)>)/gi;

return (
<React.Fragment>
    <div className={s.body}>
    { 
        <div className={s.gridContainer}>
            <div className={s.imgContainer}>
            {game.mine?
            <img className={s.img} 
            src={game.image} 
            alt="Loading..."/>
            :  <img className={s.img} src={game.image} alt='Wait a moment...' />
            }
            </div>

            <div className={s.flexContainer}>
                <h1 className={s.name}>{game.name}</h1>
                <div className={s.atributtesContainer}>
                    <span className={s.span} key={'rat'}>Rating: {game.rating}</span>
                    <span className={s.span} key={'rel'}>Released: {game.released}</span>
                    <div>
                    <span className={s.span} key={'gen'} >Genres:</span>
                    <div>{game.genres?.join(' - ')}</div>
                    </div>
                    <div><span className={s.span}>Platforms:</span>
                    <div>{game.platforms?.join(' - ')}</div>
                    </div>
                </div>
            </div>
                <div>
                    <div className={s.description}>
                    <h2 className={s.h2}>Description</h2>
                    {game.description?.replace(regex, '').replace('&#39', '')}
                    </div>
                </div>
                <div >
            <Link to ='/home'>
            <button className={s.homeButton}> Go Home!</button>
            </Link>
        </div>
        </div>
        }
    </div>  
</React.Fragment>
)
}

export default Detail;






