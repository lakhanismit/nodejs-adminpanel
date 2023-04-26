const mongoose = require('mongoose');
const db = mongoose.connect ('mongodb://127.0.0.1/Final_project')
db ? console.log('DB is connected') : console.log('Error in DB connection');
module.exports = db