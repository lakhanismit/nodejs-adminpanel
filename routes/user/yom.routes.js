const routes = require('express').Router();

const yomController = require('../../controllers/user/yom.controller');

routes.get('/', yomController.home)
routes.get('/whole-blog-page/:_id', yomController.wholeBlogPage)
routes.get('/contact-page', yomController.contactPage)
routes.post('/addcontact', yomController.addContact)

routes.use('/', require('../index'))
routes.use('/', require('../slider.routes'))
routes.use('/', require('../recentpost.routes'))
routes.use('/', require('../blog.routes'))


module.exports = routes