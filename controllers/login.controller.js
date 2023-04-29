const LoginModel = require('../models/login.model');

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads");
const nodemailer = require('nodemailer');

const signin = (req, res) => {
    if (res.locals.findUser) {
        return res.redirect('/index')
    }
    res.render('signin')
}
const signup = (req, res) => {
    res.render('signup')
}
const index = (req, res) => {
    res.render('index')
}
const addUser = async (req, res) => {
    try {
        const addUser = await LoginModel.create(req.body)
        if (addUser) {
            return res.redirect('/admin')
        }
        console.log(addUser);
    } catch (error) {
        console.log(error);
    }
}
const userLogin = async (req, res) => {
    try {
        res.redirect('/index');
    } catch (error) {
        console.log(error);
    }
}
const logout = async (req, res) => {
    req.logout((error) => {
        if (error) {
            console.log(error);
            return false;
        }
        return res.redirect('/');
    })
}

const myprofile = (req, res) => {
    res.render('myprofile')
}

const updateprofile = async (req, res) => {
    try {
        let id = res.locals.findUser._id
        if (req.file) {
            let avtar = `${imgPath}/${req.file.filename}`;
            const updateData = await LoginModel.findByIdAndUpdate(id, Object.assign({ image: avtar }, req.body))
            if (updateData) {
                if (updateData.image !== 'uploads/default.png') {
                    fs.unlinkSync(updateData.image)
                }
            }
            return res.redirect('/index')
        } else {
            const oldImage = res.locals.findUser.image
            const updateOld = await LoginModel.findByIdAndUpdate(id, Object.assign({ image: oldImage }, req.body))
            if (updateOld) {
                return res.redirect('/index')
            }
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const forgot = async (req, res) => {
    await res.render('./forgotpassword')
}

const otp = async (req, res) => {
    if (req.cookies.check_otp) {
        return res.render('./otp')
    }
    res.redirect('/forgot-password')
}

const reset = async (req, res) => {
    if (req.cookies.check_otp) {
        return res.render('./reset')
    }
    res.redirect('/otp')
}

const forgotData = async (req, res) => {
    try {
        let email = req.body.email
        const forgotDataFetch = await LoginModel.findOne({ email })
        const id = forgotDataFetch.id;
        if (!forgotDataFetch) {
            console.log('email not found');
            return false
        } else {
            let otp = Math.floor(Math.random() * 90000 + 100000)
            let obj = { email, otp, id }

            const transpoter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "smitlakhani2062002@gmail.com",
                    pass: "tequaszrhrezreqw"
                }
            });

            let mailoptions = {
                from: "smitlakhani2062002@gmail.com",
                to: email,
                subject: "For Reset Your Password Mail Form DHASHMIN Admin",
                text: `Your One Time Password(OTP) is :- ${otp}`,
            };

            transpoter.sendMail(mailoptions, (err, info) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.cookie("OTP", obj);
                    console.log(`Email Sent Successfully To ${email}_${info.response}`);
                    return res.render("otp");
                }
            });
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const otpData = async (req, res) => {
    if (req.body.otp == req.cookies.OTP.otp) {
        res.cookie('check_otp', req.body.otp)
        return res.redirect('/reset-password')
    }
    console.log('data not match');
    res.redirect('back')
}

const updatePassword = async (req, res) => {
    try {
        let id = req.cookies.OTP.id;
        let password = req.body.npassword;
        if (req.body.npassword == req.body.cnpassword) {
            const update = await LoginModel.findByIdAndUpdate(id, { password });
            if (update) {
                res.clearCookie("OTP");
                res.clearCookie("check_otp");
                console.log("Password Update Successfully");
                return res.redirect("/");
            } else {
                return res.redirect("back");
            }
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}


module.exports = { signin, signup, index, addUser, userLogin, logout, myprofile, updateprofile, forgot, forgotData, otp, otpData, reset, updatePassword }