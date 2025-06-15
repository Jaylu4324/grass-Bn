const userModel = require("../models/userModel")

const userProfile = async () => {
    try {
        let authToken = req.cookies.authToken
        let userData = await userModel.findOne({ _id: authToken })
        if (!userData) {
            return res.status(404).json({ isSuccess: false, message: 'User Not Found' })
        }
        return res.status(200).json({ isSuccess: true, message: 'User Found ', userData })
    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error" })
    }
}