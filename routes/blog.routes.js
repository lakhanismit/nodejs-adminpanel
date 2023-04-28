const express = require('express');
const routes = express.Router()
const passport = require('passport');
const imageUpload = require('../middleware/imageupload');

const blogController = require('../controllers/blog.controller');

routes.get('/blog-page', passport.checkAuthentication, blogController.blogpage)

routes.post('/addblog', imageUpload, blogController.addblog)
routes.get('/deleteBlog/:_id', blogController.blogDelete)
routes.get('/editBlog/:_id', blogController.blogEdit)
routes.post('/updateblog/:_id',imageUpload, blogController.updateBlog)
routes.get('/blogActive/:_id', blogController.Active)
routes.get('/blogDeactive/:_id', blogController.Deactive)

module.exports = routes