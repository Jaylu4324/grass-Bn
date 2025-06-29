const studentModel = require("../models/studentModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {sendMail} = require("../utils/sendMail")
const { resetPasswordTemplate } = require("../template/ResetPassword")
const studentLogin = async (req, res) => {
    try {
        let { Email, password } = req.body
        let isStudentExist = await studentModel.findOne({ Email })
        if (!isStudentExist) {
            return res.status(404).json({ isSuccess: false, message: "Student is not found" })
        }
        let invalidPassword = bcrypt.compareSync(password, isStudentExist.password)
        if (!invalidPassword) {
            return res.status(400).json({ isSuccess: false, message: "invalid credential" })
        }

        const authToken = jwt.sign({ _id: isStudentExist._id }, process.env.student_key)
        res.cookie("authToken", authToken, {
            httpOnly: true,
            secure: true
        })
        return res.status(200).json({ isSuccess: true, message: "Student login Successfully" })
    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

const forgetPassword = async (req, res) => {
    try {
        let{Email}= req.body
        let isStudentExist = await studentModel.findOne({ Email})

        if (!isStudentExist) {
            return res.status(404).json({ isSuccess: false, message: "Student is not found" })
        }
        let token = jwt.sign({ _id: isStudentExist._id }, process.env.student_key, { expiresIn: "5m" })
        let frontEndUrl = `${process.env.front_end_url}/resetPassword?token=${token}`
       await sendMail("krunalmistry7545@gmail.com", "krunal8588@gmail.com", "Reset Your Password", resetPasswordTemplate(frontEndUrl))

        return res.status(200).json({ isSuccess: true, message: "Reset Password Link Sent" })
    }
     catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
        
    }
}

const resetPassword = async (req, res) => {
    try {
            let { password, confirmPassword } = req.body        
        let { token } = req.body
        if (!token) {
            return res.status(400).json({ isSuccess: false, message: "Token not found" })
        }

        let decoded = jwt.verify(token, process.env.student_key)
        if (!decoded) {
            return res.status(401).json({ isSuccess: false, message: "Invalid Token" })
        }
        const isStudentExist = await studentModel.findOne({_id:decoded._id})
        if (!isStudentExist) {
            return res.status(404).json({ isSuccess: false, message: "Student not found" })
        }

        let hashedPassword = bcrypt.hashSync(password, 10)
        let isPasswordUpdated = await studentModel.updateOne({ _id: decoded._id }, {
            $set: { password: hashedPassword }
        })
        if (isPasswordUpdated){
            res.status(200).json({ isSuccess: true, message: "Password updated successfully" })
        }
        else {
            return res.status(400).json({ isSuccess: false, message: "Password update failed" })
        }

       
    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

module.exports = { studentLogin, forgetPassword, resetPassword }