const jwt = require("jsonwebtoken")
const masterAdminModel = require("../models/masterAdminModel")

const isValidMasterAdmin = async (req, res, next) => {
    try {
        let authToken = req?.cookies?.authToken
        if (!authToken) {
            return res.status(400).json({ isSuccess: false, message: "Invalid Token" })
        }
        let decodedToken = jwt.verify(authToken, process.env.secret_key)
        if (!decodedToken) {
            return res.status(401).json({ isSuccess: false, message: "Unauthorized Master Admin" })
        }
        let isMasterAdminExist = await masterAdminModel({ _id: decodedToken._id })
        if (!isMasterAdminExist) {
            return res.status(401).json({ isSuccess: false, message: "UnAuthorized User" })
        }
        req.authToken = decodedToken
        next()
    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

module.exports = { isValidMasterAdmin }