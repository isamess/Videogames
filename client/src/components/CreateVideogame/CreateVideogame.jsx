import React, { useState, useEffect } from "react";
import { getGamesGenre, postVideogame, getPlatforms, getAllVideogames, cleanFilter } from '../../Redux/Actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import s from './create.module.css'
import { Link } from "react-router-dom";


//TODO: validate options
//validate devuelve el obj errors, vacio o con alguna propiedad si encuentra un error
function validate (input) {
let errors = {}
let pattern =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/;
let reg_exImg = /.*(png|jpg|jpeg|gif)$/;

if(!input.name) {
    errors.name = 'name required'
} else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
    errors.name = 'Only letters, dash and parenthesis'
}
if(input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
    errors.image='invalid URL'
}
if(!input.description) {
    errors.description = 'description required'
} else if (input.description.length > 300) {
    errors.description = 'Description too long. (Max = 100 caracteres)'
}
if(!input.released) {
    errors.released = 'date required'
}
if(!input.rating) {
    errors.rating = 'Rating required'
} else if(input.rating > 5) {
    errors.rating = 'Rating cant be mayor than 5'
} else if(input.rating < 0) {
    errors.rating = 'Rating cant be a negative number'
}else if(!pattern.test(input.image)){
    errors.image = 'You may add a link'
}else if (!pattern.test(input.image)) {
    if (!reg_exImg.test(input.image)){
        errors.image = 'Link needs to end with jpeg, jpg, png, gif or bmp'
    }
}
return errors 
}



const  Create= ()=> {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [errors, setErrors] = useState({}); 

    const videogames = useSelector(state => state.videogames)
    const platforms = useSelector((state) => state.platforms.sort((a, b) => {
        if (a > b) {
            return 1;
            }
            if (a < b) {
            return -1;
            }
            return 0;
        }))

        const genres = useSelector((state) =>
        state.genres.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
        })
    );
    
//TODO: set form states
const [input, setInput] = useState({
name: "",
description: "",
released: "",
rating: "",
image: "",
genres: [],
platforms:[]
});

useEffect(() => {
    dispatch(getGamesGenre());
    dispatch(getPlatforms());
    dispatch(getAllVideogames());
    if(validate(input)){
        setErrors(validate(input))
    }
    return()=>{
        dispatch(cleanFilter());
    };
    }, [dispatch, input])


// Handlers
        const handleChange=(e)=> {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        };


        const handleGenres=(e)=> {
            e.preventDefault();
            if (!input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value],
            });
            setErrors(
                validate({
                ...input,
                genres: [...input.genres, e.target.value],
                })
            );
            }
        }

        const handleDeleteGenre=(e)=> {
            e.preventDefault();
        setInput({
        ...input,
        genres: input.genres.filter((gen) => gen !== e.target.value)
        });
        setErrors(validate({
            ...input,
            [e.target.name]: [e.target.value],
        }))
        }

        const handleSelectPlatforms=(e)=> {
            e.preventDefault();
            if (!input.platforms.includes(e.target.value)) {
                setInput({
                ...input,
                platforms: [...input.platforms, e.target.value],
                });
                setErrors(
                validate({
                    ...input,
                    platforms: [...input.platforms, e.target.value],
                })
                );
            }
            }

        const handleDeletePlatform=(e)=> {
            e.preventDefault();
            let platformFilter= input.platforms.filter((p)=> p !== e.target.value)
        setInput({
        ...input,
        platforms: platformFilter,
        });
        };

      


        const handleSubmit=(e)=> {
        e.preventDefault();
        let noRepeat = videogames.filter(n => n.name === input.name)
        if(noRepeat.length !== 0) {
        alert('That name already exists')
        } else {
        let error = Object.keys(validate(input)) // Object.keys(errors) --> errors = {} => devuelve un array de strings q representa todas las propiedades del objeto solo habra props si  HAY ALGUN ERROR
        if(error.length !== 0 || !input.genres.length || !input.platforms.length) { //si hay error, va a ser un array con la prop del error
        alert('Fill all the fields correctly, please')
        return
        } else {
        dispatch(postVideogame(input));
        setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
        });
        alert(`The game "${input.name}" has been created succesfully!`);
        }
        history.push('/home')
        }
        };


return (
<div className={s.body} >
<form onSubmit={(e) => handleSubmit(e)} className={s.box_form}>
    <div className={s.form}>
        <h2 className={s.titulo}>CREATE YOUR VIDEO AND WIN THE GAME!</h2>

{/* NAME */}
        <div className={s.grupo}>
        <input
            className={s.create_input}
            type='text'
            required
            name='name'
            value={input.name}
            onChange={(e) => handleChange(e)}
            /> <span className={s.barra}></span>
        <label className={s.label}>Name: </label>
        {errors.name && (
            <p className={s.danger}>{errors.name}</p>
        )}
        </div>

{/* IMAGE */}
        <div className={s.grupo}>
        <label className={s.label}>Image URL: </label>
        <input
        className={s.create_input}
            type='text'
            name='image'
            value={input.image}
            onChange={(e) => handleChange(e)}
            /> <span className={s.barra}></span>
        {errors.image && (
            <p className={s.danger}>{errors.image}</p>
        )}
        </div>

{/* RELEASE */}
        <div className={s.grupo}>
        <label className={s.label}>Release: </label>
        <input
        className={s.create_input}
            required
            type='date'
            name="released"
            value={input.released}
            placeholder='yyyy-mm-dd'
            onChange={(e) => handleChange(e)}
            /> <span className={s.barra}></span>
        {errors.released && (
            <p className={s.danger}>{errors.released}</p>
        )}
        </div>

{/* RATING */}
        <div className={s.grupo}>
        <label className={s.label}>Rating: </label>
        <input
        className={s.create_input}
            required
            type="number"
            name="rating"
            value={input.rating}
            onChange={(e) => handleChange(e)}
            /> <span className={s.barra}></span>
        {errors.rating && (
            <p className={s.danger}>{errors.rating}</p>
        )}
        </div>

{/* DESCRIPTION */}
<div className={s.grupo}>
<label className={s.description}>Description: </label>
<input
className={s.textarea}
    required
    type='text'
    name='description'
    value={input.description}
    placeholder={`Description required. 255 characters max...`}
    onChange={(e) => handleChange(e)}
    > 
    </input>
{errors.description && (
    <p className={s.danger}>{errors.description}</p>
)}
</div>

{/* GENRES */}

<div className={s.grupo}>
        <select className={s.select_create}
            id="genres" 
            defaultValue="" 
            onChange={(e) => handleGenres(e)}>
            <option className={s.option_create} value='' disabled hidden>Choose some genres...</option>
            {genres.map((g) => {
            return (
                <option className={s.option_create} key={g.id} value={g.name}>{g.name}</option>
                );
            })}
        </select> 
            <span className={s.barra}></span>
            <label className={s.label}>Genres: </label>
            {input.genres.map((g) => (
            <div className={s.box_opcion}>
            <div className={s.opcion_title}>{g}</div>
                <button className={s.btn_remove} 
                onClick={() => handleDeleteGenre(g)} 
                key={g} 
                value={g}>
                <span className={s.x}>X</span></button>
            </div>
    ))}
        </div>




{/* PLATFORMS */}

<div >
        <div id="platforms" className={s.grupo}>
            <label className={s.platformTitle}><strong>Platforms: </strong>{" "}</label>
            <span className={s.barra}></span>
            <select className={s.select_create} onChange={handleSelectPlatforms}>
            {" "}
            {platforms.map((e) => (
                <option className={s.option_create} value={e}> {e} </option>
                ))}{" "}
            </select>
        </div>

        
        {input.platforms.map((el) => (
        <div className={s.box_opcion}>
            <p> {el}</p>{" "}
            <button
            name="platforms"
            value={el}
            key={el}
            className={s.btn_remove}
            onClick={(el) => handleDeletePlatform(el)}>
            <span className={s.x}>X</span>
            </button>
        </div>
        ))}
        <br />
        </div>
    </div>
    <div>
        <button type="submit" className={s.btn_submit}>CREATE VIDEOGAME</button>
    </div>
    <div className={s.box_home}>
        <Link to='/home'>
        <button className={s.back_home}>BACK</button>
        </Link>
        
    </div>
    </form>

</div>
);
}

export default Create;