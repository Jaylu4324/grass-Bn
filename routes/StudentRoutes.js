const express =require('express')
const {addStudent,updateStudent,deleteStudent,getStudent} = require('../controllers/studentController')
const {studentLogin,forgetPassword,resetPassword} = require("../controllers/studentLoginController")
const Router  =express.Router()

Router.post("/add",addStudent)   
Router.put("/update",updateStudent)   
Router.delete("/delete",deleteStudent)
Router.get("/all",getStudent)

Router.post("/login",studentLogin)
Router.post("/forgetPassword",forgetPassword)
Router.post("/resetPassword",resetPassword)

module.exports= Router
