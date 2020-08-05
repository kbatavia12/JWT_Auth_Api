const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token,Origin ,Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateCredentails, verifySignUp.checkRolesExisted],
    controller.signUp
  );

  app.post("/api/auth/signin", controller.signIn);
};