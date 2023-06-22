const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secretKey} = require("./config")

function generateAccessToken(id, roles){
    const payload = {id, roles};
    return jwt.sign(payload, secretKey, );
    //payload: обьект с данными которые мы хотим спрятать в токене
    //secretKey: по ключу расшифровывается токен
    //options: expiresIn:"24" (время жизни токена)
}

class authController{
    async registration(req,res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: "ошибка регистрации", errors});
            }
            const{username, password} = req.body;
            const candidate = await User.findOne({username});
            if(candidate) {
                return res.status(400).json({message:"Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 3);
            const userRole = await Role.findOne({value:"USER"});
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save();
            return res.json({message:'Пользователь успешно зарегистрирован'});
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message: `Registration error!!`});
        }
    }
    async login(req,res){
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message: `Вы ввели неверный пароль`});
            }
            const token = generateAccessToken(user.id, user.roles);
            return res.json({token})
        } catch (error) {
            res.status(400).json({message: `login error`});
        }
    }
    async getUsers(req,res){
        try {
/*             const userRole = new Role();
            const adminRole = new Role({value: "ADMIN"});
            await userRole.save();
            await adminRole.save(); */
            //добавление ролей в Mongo

            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController();