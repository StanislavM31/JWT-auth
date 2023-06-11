
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {type: String, unique: true, required:true},
    password: {type: String, required: true},
    roles:[{type:String, ref: 'Role'}]
    //пользователь будет обладать массивом ролей(user,admin). ссылка на сущность Роли
});
//как будет хранится пользователь в БД


module.exports = mongoose.model('User', User);
