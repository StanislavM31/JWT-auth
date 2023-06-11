const mongoose = require('mongoose');

//как будет хранится пользователь в БД

const Role = new mongoose.Schema({
    value: {type: String, unique: true, default: "USER"}
})

module.exports = mongoose.model('Role', Role)