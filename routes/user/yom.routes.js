const routes = require('express').Router();
const passport = require('passport');

const yomController = require('../../controllers/user/yom.controller');

routes.get('/yom-index',passport.checkAuthentication, yomController.home)


module.exports = routes