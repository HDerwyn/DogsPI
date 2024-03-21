const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getRoutes = require("./getRoutes");
const postRoutes = require("./postRoutes")


const router = Router();


router.use("/", getRoutes);
router.use("/post", postRoutes);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
