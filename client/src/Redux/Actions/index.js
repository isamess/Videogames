import axios from "axios";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_GAMES_QUERY = "GET_GAMES_QUERY";
export const GET_GENRES = "GET_GENRES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const ORDER_FILTER = "ORDER_FILTER";
export const FILTER_GENRES = "FILTER_GENRES";
export const HOME= "HOME";
export const GET_BY_NAME="GET_BY_NAME";
export const CLEAN_DETAIL="CLEAN_DETAIL"
export const GET_DETAIL_ID= "GET_DETAIL_ID";
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const FILTER = 'FILTER';
export const FILTER_CREATED= "FILTER_CREATED"
export const CLEAN_FILTER= 'CLEAN_FILTER';
export const CREATE_VIDEOGAME='CREATE_VIDEOGAME';
export const GET_BY_ID= 'GET_BY_ID';
export const GET_DB= "GET_DB";
export const GET_API= "GET_API";
export const ORDER_GAMES= "ORDER_GAMES";
export const FILTRO_POR_TRES= 'FILTRO_POR_TRES';



export const getAllVideogames=()=> {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/videogames`);
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: json.data,
    });
  };
}

export const getDb = () => async dispatch => {
  return await axios.get('http://localhost:3001/database')
  .then((response) => {
      dispatch({
        type: GET_DB,
        payload: response.data,

      });
      console.log("RESPUESTA", response.data)
    });  
}

export const getApi = () => async dispatch => {
  return await axios.get('http://localhost:3001/Api')
  .then((response) => {
      dispatch({
        type: GET_API,
        payload: response.data,
      });
    });  
}



export function getGamesByQuery(title) {
  return async function (dispatch) {
    let getGames = await axios.get(
      `http://localhost:3001/videogames?name=${title}`
    );
    let gamesData = getGames.data;
    return dispatch({ 
      type: GET_GAMES_QUERY, 
      payload: gamesData });
  };
}
export const searchVideoGames=(name)=>{
  return async(dispatch)=>{
      try {
          const json=await axios.get('http://localhost:3001/videogames?name='+name)
         //  console.log(json.data)
          return dispatch({
              type:GET_BY_NAME,
              payload:json.data
          })
      } catch (error) {
          console.log(error)
      }
  }
}

export const getGamesGenre=()=> {
  return async function (dispatch) {
    let getGenre = await axios.get(`http://localhost:3001/genres`);
    let getGenreData = getGenre.data;
    return dispatch({ type: GET_GENRES, payload: getGenreData });
  };
}


export const getDetailId = (id) =>{
  return async function(dispatch){
    try {
      let json = await axios.get(`http://localhost:3001/videogame/${id}`)
      return dispatch({type:GET_DETAIL_ID, payload:json.data})
      
    } catch (error) {
      console.log(error.message)
      return dispatch({type:GET_DETAIL_ID, payload:{name:404}
      })
    }
  }
}

export const cleanDetail = () =>{
  return{type:CLEAN_DETAIL}
}

export const getGameId = (id) => {
  return async function (dispatch) {
      try{
      const gameId = await axios.get(`/videogames/${id}`);
      return dispatch ({
          type: GET_BY_ID,
          payload: gameId.data
      })
       } catch(error){
          console.log(error.message)
      } 
  }
}
export const postVideogame=(payload)=> {
  return async function () {
    try {
       const response= await axios.post("http://localhost:3001/videogame", payload);
       return response
    } catch (error) {
      console.log(error.message)
    }
  };
};

export const filterCreated=(payload)=> {
  return {
    type: FILTER_CREATED,
    payload,
  };
}



export const orderedGames=(type)=>{
  return async function(dispatch){
    return dispatch({type:ORDER_GAMES, payload:type})
  }
};

export const orderFilter=(type)=> {
  return async function (dispatch) {
    return dispatch({ type: ORDER_FILTER, payload: type });
  };
};

export const filterGenres=(data)=> {
  return async function (dispatch) {
    return dispatch({ type: FILTER_GENRES, payload: data });
  };
}

export const home=(payload)=>{
  return{
      type: HOME,
      payload
  }
}
export const filter=(value)=> {
  return async function (dispatch) {
      dispatch({
          type: FILTER,
          payload: value
      })
  }
}
export const cleanFilter=()=> {
  return {
    type: "CLEAN_FILTER",
    payload: [],
  };
}

export const getPlatforms=()=> {
  return async function (dispatch) {
    try {
      let call = await axios.get("http://localhost:3001/platforms");
      return dispatch({
        type: GET_PLATFORMS,
        payload: call.data,
      });
    } catch (error) {
      console.log("Error en la action GET_PLATFORMS", error);
    }
  };
}

export const filtrarPorTres=()=>{
  return async function(dispatch){
    dispatch({
      type: FILTRO_POR_TRES,
    
    })
  }
}