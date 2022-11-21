const {Router}= require ('express');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();

const videogameRouter= require('./videogameRoute')
const genresRouter= require('./genresRoute')
const platformRouter= require('./platformRoute')


router.use('/videogames', videogameRouter);
router.use('/genres', genresRouter);
router.use('/videogame', videogameRouter );
router.use('/platforms', platformRouter );



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
