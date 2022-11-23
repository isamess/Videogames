
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');


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
                    description: game.description,
                    platforms: game.platforms?.map(el => el.platform.name).join().split(" - "),
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
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
    //lo paso a una lista de objetos, así me llegan igual que de la api
    let videogames = await gamesFromDb.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.image,
            released: game.released,
            rating: game.rating,
            description: game.description,
            platforms: game.platforms.map(e => e || e.name),
            genres: game.genres.map(genre => genre.name),
            createdInDb: true,
        }
    });
    return videogames;

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
                description: game.description,
                platforms:game.platforms?.map(el => el.platforms.name),
                genres: game.genres?.map(genre => genre.name),
            }
        })
        return videoSearch
    } catch (error) {
        console.log(error.message)
    }
};



const getPlatforms = async () => {
    let apiInfo = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    var platformsApi = apiInfo.data.results.map((p) => p.name);
    return platformsApi;
}

const searchVideogamesByID= async(id)=> {
    const dbVideogames = await getVideogamesFromDb();
    let videogame = dbVideogames.find(game => game.id === id);
    if (videogame) return videogame;
    //Si no lo encuentra lo buscamos en la api
    try{
    let { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    let videogame = {
        id: data.id,
        name: data.name,
        description: data.description,
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


//TODO: Genres from Api saved in Db
const getGenres= async()=>{
    try {
        const response= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

   const  apiGenres= response.data.results.map(genre=>{
        // console.log(response)
            return{
                id: genre.id,
                name: genre.name
            }
            
        })
        apiGenres.forEach(g=> Genre.findOrCreate({
            where:{name: g}
        }))
        const allGenres= await Genre.findAll()
        response.json(allGenres)
    } catch (error) {
        console.log(error.message)
    }
};


//TODO:get genres in Db
const getGenresFromDb= async()=>{
    try {
        let genDb= await Genre.findAll();
        genDb= genDb.map(g=>g.toJSON());
        return genDb;
    } catch (error) {
        console.log(error.message)
    }
};



module.exports = {
    getAllVideogames,
    searchVideogamesInApi,
    searchVideogamesByID,
    getGenresFromDb,
    getVideogamesFromDb,
    getVideogamesFromApi,
    getGenres,
    getPlatforms,
    
};
