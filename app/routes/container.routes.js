// app/routes/container.routes.js

const { authJwt } = require("../middleware");
const controller = require("../controllers/container.controller");

module.exports = (app) => {
  app.post(
    "/api/container/create",
    [authJwt.verifyToken],
    controller.createContainer
  );

  app.get("/api/container/all", [authJwt.verifyToken], controller.getAllContainers);

  app.get("/api/container", [authJwt.verifyToken], controller.getContainerBySi);

  app.put("/api/container/update", [authJwt.verifyToken], controller.updateContainer);

  app.delete("/api/container/delete",[authJwt.verifyToken],controller.deleteContainer);
  
};
