const jwt = require('jsonwebtoken');
const {secretKey} = require("../config");

module.exports = function(req,res,next) {
    if(req.method === "OPTIONS"){ //пропускаем метод OPTIONS
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; //достаём сам токен без заголовка
        if(!token){
            return res.status(403).json({message:"Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(token, secretKey)//расшифрованный токен
        req.user = decodedData; //добавляем нвоое поле к запросу,чтобы можно было использовать в других функциях
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "Пользователь не авторизован"});
    }
}