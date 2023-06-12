const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcrypt');

class authController{
    async registration(req,res){
        try {
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
            console.log(error);
            res.status(400).json({message: `Registration error!!`});
        }
    }
    async login(req,res){
        try {

        } catch (error) {
            res.status(400).json({message: `login error`});
        }
    }
    async getUsers(req,res){
        try {
 /*            const userRole = new Role();
            const adminRole = new Role({value: "ADMIN"});
            await userRole.save();
            await adminRole.save(); */
            //добавление ролей в Mongo
            res.json('server work');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController();