const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

function isAccessAllowed(roles) {
  return function  (req, res, next) {
    if (req.method === "OPTIONS") {
      //пропускаем метод OPTIONS
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; //достаём сам токен без заголовка
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const { roles: userRoles } = jwt.verify(token, secretKey);
      let hasRole = false;
      userRoles.forEach((role) => {
        //есть ли в списке ролей те роли которые разрешены для этой f
        if (roles.includes(role)) {
          //содержит ли список разрешенных ролей (roles) роль которая есть у пользователя
          hasRole = true;
        }
      })
      if (!hasRole) res.status(403).json({ message: "У вас нет доступа" });
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  }
}

module.exports = isAccessAllowed;