const mongoose = require('mongoose');

//как будет хранится пользователь в БД

const Role = new mongoose.Schema({
    value: {type: String, unique: true, default: "USER"}
})
//console.log(Role.obj.value.default);

module.exports = mongoose.model('Role', Role)