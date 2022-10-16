const { getDb } = require('../database/conn');

exports.userModel = () => getDb().collection('users');
