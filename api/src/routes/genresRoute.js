const {Router} = require('express')
const {Genre} = require('../db')
const router = Router()
const { API_KEY } = process.env;
const axios= require('axios');
const {getGenresFromApi}= require('../controllers')


router.get('/', async function(req, res){
    try {
        let apiGenres= await getGenresFromApi();
        let dbGenres = await Genre.findAll();
        if (!dbGenres.length) {
            const mapedGenres = apiGenres.map(g=>({
                id: g.id,
                name: g.name
            }))
    
    
        const allGenres = await Genre.bulkCreate(mapedGenres);
        res.send(allGenres);
        } else {
        let allGenresMapped = dbGenres.map((r) => {
            return {
                    id: r.id, 
                    name: r.name };
        });
        res.send(allGenresMapped);
        }
    
} catch (error) {
    console.log(error.message)
}
});

module.exports = router