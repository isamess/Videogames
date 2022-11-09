const {Router} = require('express')
const axios = require('axios');
const {Videogame, Genre} = require('../db')
const {getAllVideogames, searchVideogamesByID } = require('../controllers');
const { API_KEY } = process.env;



const router = Router()

router.get('/', async (req, res, next)=>{
    try {
        const {name} = req.query
        let juegos= await getAllVideogames()
        if(name){
            let juegosName= juegos.filter(e => e.name.toLowerCase().includes(name.toLowerCase())).slice(0, 15)
            if(juegosName.length)  
            res.send(juegosName)
            else  res.status(404).send('Videogame not found')
        }else{
            let todos= juegos.map(e=>{
                return{
                    id: e.id,
                    name: e.name,
                    genres: e.genres,
                    image: e.image,
                    rating: e.rating
                }
            })
            res.send(todos)
        }
    } catch (error) {
        console.log(error.message)
    }
})



router.get('/:id', async (req, res)=>{
    let id = req.params.id;
    const videogames = await searchVideogamesByID(id);
    if (videogames) res.status(200).json(videogames);
    else res.status(404).send({msg: 'Videogame not found'});
})



router.post('/', async (req, res)=>{
    let {name, description, image, released, rating, platforms, genres, createdInDb} = req.body;
    try {
        if(!name || ! description || !platforms || !genres) res.status(400).send({msg: 'missing fields'});
        
        const videoDb = await Videogame.findAll({ where: { name: name } });
        if (videoDb.length != 0) {
        return res.send("Name already exists");}

        
        const newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms:platforms,
            image,
            createdInDb: true
        });
        console.log(newVideogame)
        const genreDB= await Genre.findAll({
            where:{
                name: genres
            }
        })
        newVideogame.addGenre(genreDB)
        res.status(200).send('Videogame created')

} catch (error) { 
    console.log(error.message)
}
});



router.get('/:id', async (req, res) =>{
    const {id} = req.params;
    try{
  if(!id.includes('-')){
        let getAllGames = await getAllVideogames(); 
    
        let oneGame = getAllGames.filter(e => e.id === parseInt(id));
    
        if(oneGame.length > 0){
            const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const description = detalle.data.description_raw;
            oneGame[0]['description'] = description;
            res.status(200).send(oneGame)
        }
    }else {
        let theGame = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through : {
                    attributes: [],
                }
            }]
        })
        var arreglo = []
        arreglo.push(theGame)
        res.status(200).json(arreglo)
    }
    }catch(error){
        res.status(404).send(error)
    }
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

// router.put('/:id', async (req, res, next)=>{
//     const {id} = req.params
//     const {name, description, rating, released, platform} = req.body
//     try {
//         let updateVideo= await Videogame.findOne({
//             where:{
//                 id: id,
//             },
//             include:{
//                 model: Genre,
//                 attributes: ['name'],
//                 through: {
//                     attributes:[]
//                 }}
//         });
//         await updateVideo.update({
//             name,
//             description,
//             rating,
//             released,
//             platform
//         });
//         let genDb= await Genre.findAll({
//             where:{
//                 name:{
//                     [Op.in]: req.body.genres,
//                 },
//             },
//         });
//         await updateVideo.setGenres(genDb);
//         res.send(updateVideo)
//     } catch (error) {
//         next(error)
//     }    
// })



module.exports = router