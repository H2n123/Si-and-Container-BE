// app/routes/si.routes.js

const { authJwt } = require("../middleware");
const controller = require("../controllers/si.controller");

module.exports = (app) => {
  app.post(
    "/api/si/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createSi
  );

  app.get("/api/si/all", 
    [authJwt.verifyToken], 
    controller.getAllSis);

  app.get("/api/si",
    [authJwt.verifyToken], 
    controller.getSiBySiNo
  );

  app.put(
    "/api/si/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateSi
  );

  app.delete(
    "/api/si/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteSi
  );
};
