const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Имя Пользователя не может быть пустым").notEmpty(),
    check("password", " 4 < длина пароля должна < 9").isLength({min:4, max:8})
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);

module.exports = router;
