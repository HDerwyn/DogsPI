const { Router } = require("express");
const postDogsHandler = require("../handlers/postHandlers")

const postRoutes = Router();


postRoutes.post("/", postDogsHandler);





module.exports = postRoutes;

