const { Router } = require("express");
const {
  getDogsHandlers,
  getDogsParamsHandler,
  getDogsbyQueryHandler,
  getTemperamentsHandler,
  getDogsFromApiHandler,
  getDogsFromBddHandler,
} = require("../handlers/getHandlers");

const getRoutes = Router();

getRoutes.get("/dogs/api", getDogsFromApiHandler);
getRoutes.get("/dogs/bdd", getDogsFromBddHandler);
getRoutes.get("/dogs/query/", getDogsbyQueryHandler);
getRoutes.get("/dogs/:id", getDogsParamsHandler);
getRoutes.get("/temperaments", getTemperamentsHandler);
getRoutes.get("/dogs", getDogsHandlers);





module.exports = getRoutes;