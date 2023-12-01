// app/routes/auth.routes.js
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = app => {
    const { verifySignUp } = require("../middleware");
    // const controller = require("../controllers/auth.controller");
  
    app.post(
      "/api/auth/signup",
      [
        verifySignUp.checkDuplicateUserNameOrEmail,
        verifySignUp.checkRolesExisted,
      ],
      controller.signup
    );
  
    app.post("/api/auth/signin", controller.signin);
  };
  