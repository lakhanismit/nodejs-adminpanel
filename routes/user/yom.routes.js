const routes = require('express').Router();
const passport = require('passport');

const yomController = require('../../controllers/user/yom.controller');

routes.get('/', yomController.home)

routes.use('/', require('../index'))
routes.use('/', require('../slider.routes'))
routes.use('/', require('../recentpost.routes'))


module.exports = routes