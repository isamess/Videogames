import axios from "axios";
export const GET_GAMES_QUERY = "GET_GAMES_QUERY";
export const GET_GAMES_ID = "GET_GAMES_ID";
export const GET_GENRES = "GET_GENRES";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const ORDER_FILTER = "ORDER_FILTER";
export const FILTER_GENRES = "FILTER_GENRES";
export const HOME= "HOME";
export const GET_BY_NAME="GET_BY_NAME";
export const GET_DETAIL= "GET_DETAIL";
export const CLEAN_DETAIL="CLEAN_DETAIL"
export const GET_DETAIL_ID= "GET_DETAIL_ID";
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const CREATE_VIDEOGAME= 'CREATE_VIDEOGAME';
export const GET_VIDEOGAMES= 'GET_VIDEOGAMES';
export const FILTER = 'FILTER';
export const CLEAN_FILTER= 'CLEAN_FILTER';



export function getAllVideogames() {
  return async function (dispatch) {
    let getAllVideogames = await axios.get(`http://localhost:3001/videogames`);
    let getAllVideogamesData = getAllVideogames.data;
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: getAllVideogamesData,
    });
  };
}

export function getVideogames(orderBy, order, name, filterOrigin, filterGenre,) {
  return async function (dispatch) {
      try {
          if (orderBy === 'default') orderBy = 'id'
          if (name) {
              const gamesNamed = await axios.get(`http://localhost:3001/videogames?game=${name}&orderBy=${orderBy}&order=${order}`)
              dispatch({
                  type: GET_VIDEOGAMES,
                  payload: gamesNamed.data
              })
          } else {
              const games = await axios.get(`http://localhost:3001/videogames?orderBy=${orderBy}&order=${order}`)
              
              //inicio filtrados

              if (filterOrigin === 'All' && filterGenre === 'All') {
                  dispatch({
                      type: GET_VIDEOGAMES,
                      payload: games.data
                  })
              } else if (filterOrigin === 'creados') {
                  let filteredGames = games.data.filter(e => e.mine)
                  if (filterGenre !== 'All') {
                      const doubleFiltered = filteredGames.filter((e) => { return e.genres.some((a) => a.name === filterGenre) })
                      dispatch({
                          type: GET_VIDEOGAMES,
                          payload: doubleFiltered
                      })
                  } else {
                      dispatch({
                          type: GET_VIDEOGAMES,
                          payload: filteredGames
                      })
                  }
              } else if (filterOrigin === 'api') {
                  let filteredGames = games.data.filter(e => !e.mine)
                  if (filterGenre !== 'All') {
                      const doubleFiltered = filteredGames.filter((e) => {
                          return e.genre.some((a) => a === filterGenre) })
                      dispatch({
                          type: GET_VIDEOGAMES,
                          payload: doubleFiltered
                      })
                  } else {
                      dispatch({
                          type: GET_VIDEOGAMES,
                          payload: filteredGames
                      })
                  }

                  //filtrado unicamente por genero

              } else if (filterGenre !== 'All') {
                  let filteredByGenre = games.data.filter((e) => {
                      if (e.mine) {
                          return e.genres.some((a) => a.name === filterGenre)
                      } else {
                          return e.genre.some((a) => a === filterGenre)
                      }
                  })
                  dispatch({
                      type: GET_VIDEOGAMES,
                      payload: filteredByGenre
                  })
              }
          }
      } catch (error) {
          console.log(error)
      }
  }
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
export function searchVideoGames(name){
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
export function getGamesById(gameId) {
  return async function (dispatch) {
    let getGamesId = await axios.get(
      `http://localhost:3001/videogame/${gameId}`
    );
    let gamesIdData = getGamesId.data;
    return dispatch({ type: GET_GAMES_ID, payload: gamesIdData });
  };
}
export function getGamesGenre() {
  return async function (dispatch) {
    let getGenre = await axios.get(`http://localhost:3001/genres`);
    let getGenreData = getGenre.data;
    return dispatch({ type: GET_GENRES, payload: getGenreData });
  };
}

export const getDetail = (payload) =>{
  return async function(dispatch){
      try{
      let json = await axios.get(`http://localhost:3001/videogames?name=${payload}`)
      return dispatch({type:GET_DETAIL, payload:json.data})
      }catch(e){
      return dispatch({type:'error', payload})    
      }
  }
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

export function postVideogame(game) {
  return async function () {
    try {
       await axios.post(`http://localhost:3001/videogame`, game);
      // let postGameData = postGame.data;
      // return dispatch({ type: POST_VIDEOGAME, payload: postGameData });
    } catch (error) {
      console.log(error.message)
    }
  };
};

export function createVideogame(game) {
  return async function () {
      try {
          await axios.post("http://localhost:3001/videogames/post", game)
      } catch (error) {
          console.log(error)
      }
  }
}

export function orderFilter(type) {
  return async function (dispatch) {
    return dispatch({ type: ORDER_FILTER, payload: type });
  };
}

export function filterGenres(data) {
  return async function (dispatch) {
    return dispatch({ type: FILTER_GENRES, payload: data });
  };
}

export function home(payload){
  return{
      type: HOME,
      payload
  }
}
export function filter(value) {
  return async function (dispatch) {
      dispatch({
          type: FILTER,
          payload: value
      })
  }
}
export function cleanFilter() {
  return {
    type: "CLEAN_FILTER",
    payload: [],
  };
}

export function getPlatforms() {
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