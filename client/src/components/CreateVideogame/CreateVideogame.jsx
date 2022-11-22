import React, { useState, useEffect } from "react";
import { getGamesGenre, postVideogame, getPlatforms, getAllVideogames, cleanFilter } from '../../Redux/Actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import s from './create.module.css'
import { Link } from "react-router-dom";


//TODO: validate options
//validate devuelve el obj errors, vacio o con alguna propiedad si encuentra un error
function validate (input) {
let errors = {}
let pattern =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/;
let reg_exImg = /.*(png|jpg|jpeg|gif)$/;

if(!input.name) {
    errors.name = 'Name required'
} else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
    errors.name = 'Only letters, dashes and parenthesis'
}
if(input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
    errors.image='Invalid URL'
}
if(!input.description) {
    errors.description = 'Description required'
} else if (input.description.length > 300) {
    errors.description = 'Description too long. (Max = 100 caracteres)'
}
if(!input.released) {
    errors.released = 'Date required'
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
        errors.image = 'Link needs to finish with jpeg, jpg, png, gif or bmp'
    }
}
else if(!input.genres){errors.genres= 'Add your game genre(s) , please!'
}else if(!input.platforms){
    errors.platforms='Add at least one Platform'
}
return errors 
}



const  Create= ()=> {
   
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [errors, setErrors] = useState({}); 

    const videogames = useSelector(state => state.videogames)

    let platforms = useSelector((state) => state.platforms.sort((a, b) => {
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
platforms:[],
createdInDb: true,
});

useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getGamesGenre())
    dispatch(getPlatforms());
    if(validate(input)){
        setErrors(validate(input))
    }
    return()=>{
        dispatch(cleanFilter());
    };
    }, [dispatch, input])



// Handlers

const handleChange=(e)=> {
setInput({
        ...input,
        [e.target.name]: e.target.value,
});
    setErrors(
        validate({
            ...input,
            [e.target.name]: e.target.value,
        })
);
console.log(errors.genre);
console.log(input);
};



const handleSelectGenres=(e)=> {
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
setErrors(
    validate({
    ...input,
    [e.target.name]: [e.target.value],
})
)
const newInput = input;
setErrors(validate(newInput));

console.log(errors);
console.log(errors.genres);
}

const handleSelectPlatforms=(e)=> {
    if (!input.platforms.includes(e.target.value)) {
        setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
        });
        // setErrors(
        // validate({
        //     ...input,
        //     platforms: [...input.platforms, e.target.value],
        // })
        // );
    } else{console.log("Platform already chosen")}
    }

const handleDeletePlatform=(e)=> {
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
    rating: 0,
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
<form id='form'  className={s.box_form} 
    onSubmit={(e) => handleSubmit(e)}>
    <div className={s.form}>
        <h2 className={s.titulo}>CREATE YOUR OWN AND WIN THE GAME!</h2>

{/* NAME */}
        <div className={s.grupo}>
        <label className={s.label}>Name: </label>
        <input
            className={s.create_input}
            type='text'
            required
            name='name'
            placeholder="Name the game..."
            value={input.name}
            onChange={(e) => handleChange(e)}
            />
            {/* <span className={s.barra}></span> */}
       
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
            placehokder= "Enter image url"
            onChange={(e) => handleChange(e)}
            /> 
            {/* <span className={s.barra}></span> */}
        {errors.image && (
            <p className={s.danger}>{errors.image}</p>
        )}
        </div>

{/* RELEASE */}
        <div className={s.grupo}>
        <label className={s.label}>Release: </label><br/>
        <input
            className={s.create_input}
            required
            type='date'
            name="released"
            value={input.released}
            placeholder='yyyy-mm-dd'
            onChange={(e) => handleChange(e)}
            /> 
            {/* <span className={s.barra}></span> */}
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
            /> 
            {/* <span className={s.barra}></span> */}
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
    placeholder={`Description required. 100 characters max...`}
    onChange={(e) => handleChange(e)}
    />
{errors.description && (
    <p className={s.danger}>{errors.description}</p>
)}
</div>

{/* GENRES */}

<div className={s.grupo}>
    <label className={s.label}>
    Genres:{" "}
    </label>
    <label  className={s.option_create} > Choose some Genres </label>

    <select className={s.select_create} onChange={handleSelectGenres}>
        {genres.map((e) => (
        <option className={s.option_create} key={e.name} value={e.name}> {e.name} </option>
        ))} {" "}
    </select>
    
    {input.genres.map((el) => (
        <div>
            <span className={s.spanx}>{el}</span>{" "}
        <button
            className={s.btn_remove}
            value={el}
            onClick={(el) => handleDeleteGenre(el)}
        >X</button>
        </div>
    ))}
    </div>


{/* PLATFORMS */}

<div className={s.grupo} >

    <label  className={s.label} >
        Platforms:{" "}
    </label>
    <label  className={s.option_create} > Choose some Platforms </label>

    <select className={s.select_create} onChange={handleSelectPlatforms}>
    
    {platforms.map((p) => (
        <option  className={s.option_create} key={p} value={p}> {p} </option>
    ))}{" "}
    </select>

    {input.platforms.map((el) => (
    <div>
    <span className={s.spanx}>{el}</span>{" "}
    <button
            name="platforms"
            value={el}
            className={s.btn_remove}
            onClick={(el) => handleDeletePlatform(el)}
            >X</button>
    </div>
          ))}
            <br />
            </div>

    </div>

    <div className={s.buttons}>
    <div>
        <button type="submit" className={s.btn_submit}>CREATE VIDEOGAME</button>
    </div>
    <div className={s.box_home}>
        <Link to='/home'>
        <button className={s.back_home}>BACK</button>
        </Link>
        
    </div>

    </div>


    </form>

</div>
);
}

export default Create;