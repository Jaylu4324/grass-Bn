const masterAdminModel = require("../models/masterAdminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
        res.cookie("authToken", authToken)
        return res.status(200).json({ isSuccess: true, message: "User Login Successfully" })


    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}


const forgetPassword = () => {
    try {

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

const resetPassword = () => {
    try {

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

const adminProfile = async (req, res) => {
    try {
        let _id = req?.authToken
        let isUserExist = await masterAdminModel.findOne({ _id })
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





module.exports = {
    login,
    forgetPassword,

    resetPassword,
    adminProfile
}