const masterAdminModel = require("../models/masterAdminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { sendMail } = require("../utils/sendMail")
const { resetPasswordTemplate } = require("../template/ResetPassword")

const login = async (req, res) => {
    try {

        let { email, password } = req.body
        let isUserExist = await masterAdminModel.findOne({ email })
        if (!isUserExist) {
            return res.status(404).json({ isSuccess: false, message: "Master Admin Not Found" })
        }
        let isValidPassword = bcrypt.compareSync(password, isUserExist.password)
        if (!isValidPassword) {
            return res.status(400).json({ isSuccess: false, message: "Invalid Crendetials" })
        }
        const authToken = jwt.sign({ _id: isUserExist._id }, process.env.secret_key)
        res.cookie("authToken", authToken, {
            httpOnly: true,
            secure: true
        })
        
        return res.status(200).json({ isSuccess: true, message: "User Login Successfully" })


    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}


const forgetPassword = async (req, res) => {
    try {

        let { email } = req.body
        let isMasterAdminExist = await masterAdminModel.findOne({ email })
        if (!isMasterAdminExist) {
            return res.status(404).json({ isSuccess: false, message: "Master Admin Not Found" })
        }

        let token = jwt.sign({ _id: isMasterAdminExist?._id }, process.env.secret_key, { expiresIn: "5m" })
        let frontEndUrl = `${process.env.front_end_url}/resetPassword?token=${token}`

        await sendMail("jaygurjar3045@gmail.com", "jaygurjar3045@gmail.com", "Reset Your Password", resetPasswordTemplate(frontEndUrl))
        return res.status(200).json({ isSuccess: true, message: "Reset Password Link Sended" })
    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

const resetPassword = async (req, res) => {
    try {
        let { password, confirmPassword } = req.body

        let { token } = req.query
        if (!token) {
            return res.status(404).json({ isSuccess: false, message: "Token Not Found" })
        }
        let isValidToken = jwt.verify(token, process.env.secret_key)
        if (!isValidToken) {
            return res.status(401).json({ isSuccess: false, message: "Invalid  Token" })
        }
        let isMasterAdminExist = await masterAdminModel.findOne({ _id: isValidToken._id })
        if (!isMasterAdminExist) {
            return res.status(401).json({ isSuccess: false, message: "Master Admin Not Found" })
        }
        let newHashPassword = bcrypt.hashSync(password, 10)
        let isSaved = await masterAdminModel.updateOne({ _id: isValidToken._id }, {
            $set: {
                password: newHashPassword
            }
        })
        if (isSaved) {
            return res.status(200).json({ isSuccess: true, message: "Pasword Updated Succesfully" })
        } else {
            return res.status(400).json({ isSuccess: false, message: "Error while Update Password" })
        }
    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

const adminProfile = async (req, res) => {
    try {
        let _id = req?.authToken
        
        let isUserExist = await masterAdminModel.findOne({ _id }).select('-password'); 
        if (!isUserExist) {
            return res.status(400).json({ isSuccess: false, message: "Master Admin Not Found" })
        }
        return res.status(200).json({
            isSuccess: true, message: "Master Admin Profile Founded Successfully",
            masterAdminProfile: isUserExist
        })

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("authToken")
        return res.status(200).json({ isSuccess: true, message: "User Logoout Succesfully" })
    } catch (error) {
        return res.json({ isSuccess: false, message: "Internal Server Error", error })
    }
}





module.exports = {
    login,
    forgetPassword,
logoutUser,
    resetPassword,
    adminProfile
}