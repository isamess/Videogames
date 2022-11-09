
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');


// let urlGen= https://api.rawg.io/api/genres?key=ecbb02a871874095ba6b7116a0181452
// let urlVG = https://api.rawg.io/api/games?key=ecbb02a871874095ba6b7116a0181452;

//TODO: get videogames from API
const getVideogamesFromApi= async()=>{
    let videogames = [];
    try {
        for (let i = 1; i <= 5; i++){
            let { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
            data.results.forEach(game => {
                videogames.push({
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms?.map(el => el.platform.name).join().split(", "),
                    genres: game.genres?.map(genre => genre.name),
                    createdInDb: false,
                })
            });
        }
        return videogames;
        
    } catch (error) {
        console.log(error.message)
    }
};

//TODO get videogames from DB
const  getVideogamesFromDb= async()=>{
    let gamesFromDb = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    //de DB a una lista de objetos
    // let videogames = gamesFromDb.map(game => {
    //     return {
    //         id: game.id,
    //         name: game.name,
    //         image: game.image,
    //         released: game.released,
    //         rating: game.rating,
    //         platforms: game.platforms.map(platform => platform.platform),
    //         genres: game.genres.map(genre => genre.name),
    //         createdInDb: true,
    //     }
    // });
    // return videogames;
    return gamesFromDb;
};

//TODO: get all videogames
const  getAllVideogames= async()=>{
    const apiInfo = await getVideogamesFromApi();
    const dbInfo = await getVideogamesFromDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

const searchVideogamesInApi= async(name)=> {
    
    let searchName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    
    try {
        const videoSearch= await searchName.data.results.map(game=>{
            return{
                id: game.id,
                name: game.name,
                image: game.background_image,
                released: game.released,
                rating: game.rating,
                platforms:game.platforms?.map(el => el.platform.name),
                genres: game.genres?.map(genre => genre.name),
            }
        })
        return videoSearch
    } catch (error) {
        console.log(error.message)
    }
};



const getPlatforms = async () => {
    let apiInfo = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    var platformsApi = apiInfo.data.results.map((p) => p.name);
    return platformsApi;
}

const searchVideogamesByID= async(id)=> {
    const dbVideogames = await getVideogamesFromDb();
    let videogame = dbVideogames.find(game => game.id === id);

    if (videogame) return videogame;

    //Si no lo encuentra lo buscamos en la api
    try{
    let { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}&`)
    let videogame = {
        id: data.id,
        name: data.name,
        description: data.description_raw,
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        platforms: data.platforms.map(platform => platform.platform.name),
        genres: data.genres.map(genre => genre.name),
        }
    return videogame;
    }
    catch(error){
        console.log(error.message)
    }
}

async function getGenresFromDb(){
    return await Genre.findAll();
}

const getGenresFromApi= async()=>{
    const picar= await axios.get('https://api.rawg.io/api/genres?key=ecbb02a871874095ba6b7116a0181452')
    const data= picar.data.results
   // console.log(data)
    return data
}



module.exports = {
    getAllVideogames,
    searchVideogamesInApi,
    searchVideogamesByID,
    getGenresFromDb,
    getGenresFromApi,
    getPlatforms
};
