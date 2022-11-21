const {Router} = require('express')
const axios = require('axios');
const {Videogame, Genre} = require('../db')
const {getAllVideogames, searchVideogamesByID, getVideogamesFromDb, getVideogamesFromApi  } = require('../controllers');
const { API_KEY } = process.env;



const router = Router()


router.get('/', async (req, res)=>{
    const {name} = req.query

    try {
        let allGames= await getAllVideogames()
        if(name){
            let juegosName=  allGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            juegosName.length
            ?res.status(200).send(juegosName)
            :res.status(404).send('Videogame not found')
        }else{
            // let todos= allGames.map(e=>{
            //     return{
            //         id: e.id,
            //         name: e.name,
            //         genres: e.genres,
            //         image: e.image,
            //         rating: e.rating,
            //         released: e.released,
            //         description: e.description,
            //         platforms: e.platforms.map(p=>p.platforms),
            //         genres: e.genres.map(genre=> genre),
            //         createdInDb: e.createdInDb? true: false
            //     }
            // })
            // res.send(todos)
            res.status(200).send(allGames)
        }
    } catch (error) {
        console.log(error.message)
    }
})


router.post('/', async (req, res)=>{
    let {name, description, image, released, rating, platforms, genres} = req.body;
    try {
        if(!name || ! description || !platforms || !genres) res.status(400).send({msg: 'Missing required fields'});
        
        const videoDb = await Videogame.findAll({ where: { name: name } });
        if (videoDb.length != 0) {
        return res.send("Name already exists");}
        
        const newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            image,
            createdInDb: true
        });
        // console.log(newVideogame)

        const genresDb= await Genre.findAll({
            where:{name: genres}
        })
        // console.log(genresDb)
        await newVideogame.addGenre(genresDb)
        return res.status(200).send('Videogame created')

} catch (error) { 
    console.log(error.message)
}
});


router.get('/database', async(req, res)=>{
    try {
        const videoDb= await getVideogamesFromDb();
        res.send(videoDb);
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/Api', async(req, res)=>{
    const videoApi= await getVideogamesFromApi();
    res.send(videoApi)
});

router.get('/:id', async (req, res)=>{
    let{ id }= req.params;
    const videogames = await searchVideogamesByID(id);
    if (videogames) res.status(200).json(videogames);
    else res.status(404).send({msg: 'Videogame not found'});
})




router.delete('/:id', async (req,res,next)=>{
    const {id} = req.params
    try {
    const videoDelete= await Videogame.findByPk(id,{
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes:[]
            }}
    })
    if(videoDelete){
        await videoDelete.destroy();
        return res.send('Videogame deleted!')
    }
    res.status(404).send('Videogame not found')
   } catch (error) {
       console.log(error.message)
   }
})



module.exports = router