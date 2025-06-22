const express =require('express')
const {addStudent,updateStudent,deleteStudent,getStudent} = require('../controllers/studentController')
const Router  =express.Router()

Router.post("/add",addStudent)   
Router.put("/update",updateStudent)   
Router.delete("/delete",deleteStudent)
Router.get("/all",getStudent)


module.exports= Router
