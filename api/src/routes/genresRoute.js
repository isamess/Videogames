const {Router} = require('express')
const {Genre} = require('../db')
const router = Router()
const { API_KEY } = process.env;
const axios= require('axios');


router.get('/', async (req,res) => {
    const getGenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    // console.log("getGenres:", getGenre)
    const genre = await getGenre.data.results.map(e => e.name)
    // console.log("genre", genre)
    genre.forEach(e => Genre.findOrCreate({ 
        where: {name: e} //
    }))
    const getAllGenre = await Genre.findAll() 
    res.json(getAllGenre)
})



module.exports = router