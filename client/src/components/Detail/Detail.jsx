import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailId, cleanDetail, getPlatforms} from '../../Redux/Actions';
import { useParams} from "react-router-dom";
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
                :  <img className={s.img} src={game.image} alt='Not found' />
            }
                
                </div>

                <div className={s.infoContainer}>
                    <h1 className={s.name}>{game.name}</h1>

                    <div className={s.atributtesContainer}>
                        <span className={s.span} key={'rat'}>Rating: {game.rating}</span>
                        <span className={s.span} key={'rel'}>Released: {game.released}</span>
                        <br></br>
                        <span className={s.span} key={'gen'} >Genres:</span>
                        {game.genres?.map((e) => {
                        return<p>{e.name ? e.name : e}</p>
                        })}

                        <span className={s.span}>Platforms:</span>
                        <div>
                        {game.platforms?.join(', ')}</div>
                        </div>

                    <div>
                    <h2 className={s.h2}>Description:</h2>
                    {/* <p className={s.description}>{game.description} </p> */}

                    {!game.mine?
                    <p  className={s.description}>{game.description}</p>
                    :
                    <h3>Description not found</h3>
                    }
                    </div>
            </div>
        </div>
        }
    </div>  

</React.Fragment>
)
}

export default Detail






