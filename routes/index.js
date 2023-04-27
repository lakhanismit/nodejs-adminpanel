const express = require('express');
const routes = express.Router()
const passport = require('passport');
const loginController = require('../controllers/login.controller');
const imageUpload = require('../middleware/imageupload');

// login
routes.get('/admin', loginController.signin)
routes.get('/signup', loginController.signup)
routes.get('/index', passport.checkAuthentication, loginController.index)
routes.get('/myprofile', passport.checkAuthentication, loginController.myprofile)
routes.get('/forgot-password', loginController.forgot)
routes.get('/otp', loginController.otp)
routes.get('/reset-password', loginController.reset)


// login
routes.post('/addUser', loginController.addUser)
routes.post('/userLogin', passport.authenticate('local', { failureRedirect: "/" }), loginController.userLogin)
routes.get('/logout', loginController.logout)
routes.post('/updateprofile', imageUpload, passport.checkAuthentication, loginController.updateprofile)
routes.post('/forgot-password-check', loginController.forgotData)
routes.post('/check-otp', loginController.otpData)
routes.post('/update-password', loginController.updatePassword)



module.exports = routes