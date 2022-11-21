import {
GET_GENRES,
GET_ALL_VIDEOGAMES,
GET_GAMES_QUERY,
POST_VIDEOGAME,
ORDER_FILTER,
ORDER_GAMES,
FILTER_GENRES,
CLEAN_FILTER,
HOME,
GET_BY_NAME,
GET_DETAIL_ID,
CLEAN_DETAIL,
GET_PLATFORMS,
CREATE_VIDEOGAME,
// GET_VIDEOGAMES,
GET_BY_ID,
GET_DB,
GET_API,
FILTRO_POR_TRES
} from './Actions/index'

const initialState = {
genres: [],
videogames: [],
videogame: [],
createdVideogame: [],
filteredGames: [],
orderedBy: "ALL",
filteredBy: "ALL",
videogameDetail:[],
platforms:[],
videogamesFilter: [],
filteredXTres:[]


};

function rootReducer(state = initialState, action) {
switch (action.type) {
    case GET_GENRES:
    return {
        ...state,
        genres: action.payload,
    };
    
    case CLEAN_DETAIL:
            return{...state, videogameDetail:{}};
    case GET_DETAIL_ID:
        return{
            ...state, 
            videogameDetail: action.payload
        };
        
        case GET_BY_ID:
            return {
                ...state,
                videogameDetail: action.payload,
            };

            case GET_API:
        return {
            ...state,
            videogames: action.payload,
            videogame: action.payload
        };

            case GET_DB:
                return{
                    ...state,
                    videogame: action.payload,
                    videogames: action.payload, 
                    createdVideogame: action.payload
                };

    case POST_VIDEOGAME:
    return {
        ...state,
        // videogame: [...state.videogame.concat(action.payload)]
    };

    case GET_ALL_VIDEOGAMES:
    return {
        ...state,
        videogames: action.payload,
        filteredGames: action.payload,
        videogame: action.payload
    };
    // case GET_VIDEOGAMES: {
    //     return {
    //         ...state,
    //         videogames: action.payload
    //     }
    // }
    case GET_BY_NAME:
        return{
            ...state,
            videogames:action.payload
        };
    
    case GET_GAMES_QUERY:
    return {
        ...state,
        videogames: action.payload,
        filteredGames: action.payload,
    };
    case HOME:
        const videos= state.videogames
            return{
                ...state,
                videogames:videos
            };

    case GET_PLATFORMS:
        return {
            ...state,
            platforms: [...action.payload]
        }

        case CREATE_VIDEOGAME: {
            return {
                ...state,
                createdVideogame: action.payload
            }
        }
        case CLEAN_FILTER:
            return {
                ...state,
                videogameDetail: action.payload,
                videogames: action.payload,
            };

    case FILTER_GENRES:
    if(action.payload === "ALL"){
        return {
        ...state,
        filteredGames: state.videogames,
        filteredBy: action.payload,
        };
    }else { 
    return {
        ...state,
        filteredGames: state.videogames.filter((r) =>
        r.genres.includes(action.payload)
        ),
        filteredBy: action.payload,
    };
}



case ORDER_GAMES:
    switch(action.payload){
        case "API":
        return {
            ...state,
            orderedGames: [...state.videogames].filter(
            (r) => typeof r.id === "number"
            ),
            orderedBy: action.payload,
        };
        case "DB":
        return {
            ...state,
            orderedGames: [...state.videogames].filter(
            (r) => typeof r.id !== "number"
            ),
            orderedBy: action.payload,
        };
        case "ALL":
        return {
            ...state,
            orderedGames: state.videogames,
            orderedBy: action.payload,
        };
        default:
            return state.videogames;
    }


case FILTRO_POR_TRES:
    return{
        ...state,
        videogames: [...state.videogames].filter((videogame)=> videogame.genres.length ===3),
        
    }

    case ORDER_FILTER:
    switch (action.payload) {
        case "A-Z":
        return {
            ...state,
            filteredGames: [...state.filteredGames].sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            ),
            orderedBy: action.payload,
        };
        case "Z-A":
        return {
            ...state,
            filteredGames: [...state.filteredGames].sort((a, b) =>
            a.name < b.name ? 1 : b.name < a.name ? -1 : 0
            ),
            orderedBy: action.payload,
        };

        case "ASC":
        return {
            ...state,
            filteredGames: [...state.filteredGames].sort((a, b) =>
            a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
            ),
            orderedBy: action.payload,
        };
        case "DESC":
        return {
            ...state,
            filteredGames: [...state.filteredGames].sort((a, b) =>
            a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
            ),

            orderedBy: action.payload,
        };
        case "API":
        return {
            ...state,
            filteredGames: [...state.videogames].filter(
            (r) => typeof r.id === "number"
            ),
            orderedBy: action.payload,
        };
        case "DB":
        return {
            ...state,
            filteredGames: [...state.videogames].filter(
            (r) => typeof r.id !== "number"
            ),
            orderedBy: action.payload,
        };
        case "ALL":
        return {
            ...state,
            filteredGames: state.videogames,
            orderedBy: action.payload,
        };
       
        default:
        return state.videogames;
    }
    default:
    return {...state};
}
}

export default rootReducer;
