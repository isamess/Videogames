const {Router} = require('express')
const {Genre} = require('../db')
const router = Router()
const { API_KEY } = process.env;
const axios= require('axios');
const {getGenres, getGenresFromDb}= require('../controllers')


router.get('/', async (req,res) => {
    const getGenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    console.log("getGenres:", getGenre)
    const genre = await getGenre.data.results.map(e => e.name)
    console.log("genre", genre)
    genre.forEach(e => Genre.findOrCreate({ 
        where: {name: e} //
    }))

    const getAllGenre = await Genre.findAll() 
    res.json(getAllGenre)
})


// router.get('/',async(req, res)=>{
//     try {
//         const response= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

//    const  apiGenres= response.data.results.map(genre=>{
//         // console.log(response)
//             return{
//                 id: genre.id,
//                 name: genre.name
//             }
            
//         })
//         console.log(apiGenres)
//         // let dbGenres= await Genre.findAll();
//         // if(dbGenres.length === 0){
//         //     await Genre.bulkCreate(apiGenres)
//         // }
//         apiGenres.forEach(g=> Genre.findOrCreate({
//             where:{name: g}
//         }))
//         const allGenres= await Genre.findAll()
//         response.json(allGenres)
//     } catch (error) {
//         console.log(error.message)
//     }
// });

// router.get('/', async function(req, res){
//     try {
//         await getGenres();
//         let genres= await getGenresFromDb();
//         genres= genres.map(genre=>{
//             return {
//                 id: genre.id,
//                 name: genre.name
//             }
//         })
//         res.send(genres)
//     } catch (error) {
//         console.log(error.message)
//     }
// } )
// router.get('/', async function(req, res){
//     try {
//         await getGenres();
//         let genres= await getGenresFromDb();
//         genres= genres.map(g=>{
//             return{
//                 id: g.id,
//                 name: g.name
//             }
//         })
//         res.send(genres)
//     } catch (error) {
//         console.log(error.message)
//     }
// })



// router.get('/', async function(req, res){
//     try {
//         let apiGenres= await getGenresFromApi();
//         let dbGenres = await Genre.findAll();
//         if (!dbGenres.length) {
//             const mapedGenres = apiGenres.map(g=>({
//                 id: g.id,
//                 name: g.name
//             }))
//         const allGenres = await Genre.bulkCreate(mapedGenres);
//         res.send(allGenres);
//         } else {
//         let allGenresMapped = dbGenres.map((r) => {
//             return {
//                     id: r.id, 
//                     name: r.name };
//         });
//         res.send(allGenresMapped);
//         }
// } catch (error) {
//     console.log(error.message)
// }
// });

// router.get('/', async (req,res) => {
//     const getGenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
//     console.log("GET GENRES:", getGenre)
//     const genre = await getGenre.data.results.map(e => e.name)
//     console.log("GENRE", genre)
//     genre.forEach(e => Genre.findOrCreate({ 
//         where: {name: e,
            
//         }
//     }))

//     const getAllGenre = await Genre.findAll() 
//     res.json(getAllGenre)
// })

// router.get('/', async(req, res)=>{
//     try {
//         await getGenresFromApi();
//         let genres= await getGenresFromDb();
//         genres= genres.map(g=>{
//             return{
//                 id: g.id,
//                 name: g.name
//             }
//         })
//         genres.forEach(gen=>Genre.findOrCreate({
//             where:{name:gen}
//         }))
//         res.send(genres)
//     } catch (error) {
//         console.log(error.message)
//     }
// })

module.exports = router