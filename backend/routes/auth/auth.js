const express=require('express')
const router=express.Router()
const {login}=require('../../controllers/auth/login')
const {signup}=require('../../controllers/auth/signup')
const {verify}=require('../../controllers/auth/verify')
const {logout}=require('../../controllers/auth/logOut')
const {forgetPassword}=require('../../controllers/auth/forgetPassword')
const {verifyOtpPassword}=require('../../controllers/auth/verifyOtpForPassword')
const {newPassword}=require('../../controllers/auth/newPassword')
const {googleAuth}=require('../../controllers/auth/authGoogle')
router.post('/verify',verify)
router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)
router.post('/forgetPassword',forgetPassword)
router.post('/verifyOtpPassword',verifyOtpPassword)
router.post('/newPassword',newPassword)
router.post('/googleAuth',googleAuth)
module.exports=router


