const express=require('express')
const {login,forgetPassword,resetPassword,adminProfile}=require("../controllers/masterAdminController")
const {isValidMasterAdmin}=require("../middlewares/masterAdminMiddleware")
const Router=express.Router()
Router.post("/login",login)

Router.post("/forgetPassword",forgetPassword)

Router.post("/resetPassword",resetPassword)
Router.get("/adminProfile",isValidMasterAdmin,adminProfile)

module.exports=Router