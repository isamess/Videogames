import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getGamesByQuery} from '../../Redux/Actions';
import s from './searchBar.module.css';




const SearchBar=()=> {
    const dispatch=useDispatch();
    const [name,setName]=useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getGamesByQuery(name))
        setName('')
    }

    return (
    <form>
        <div>
        <input
        className={s.searchbar}
        type='text'
        name='name'
        value={name}
        placeholder='Search Videogame...'
        onChange={e=>handleInputChange(e)}
        />

        <button type='submit' className={s.button} onClick={e=>handleSubmit(e)}>Search</button>
        </div>
    </form>
    )
}


export default SearchBar;
