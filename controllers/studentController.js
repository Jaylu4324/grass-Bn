const studentModel = require("../models/studentModel")

const addStudent = async (req, res) => {
    try {
        let {
            studentName,
            Email,
            phoneNumber,
            course,
            address,
            password
        } = req.body

        const existingStudent  = await studentModel.findOne({ Email })
        if (existingStudent ) {
            return res.status(401).json({ isSuccess: false, message: "Email already exist " })

        }
        const studentData = new studentModel({
            studentName,
            Email,
            phoneNumber,
            course,
            address,
            password
        })



        const data = await studentData.save()
        return res.status(201).json({ isSuccess: true, message: "Student add successfully", data })

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}

const updateStudent = async (req, res) => {


    try {
        let {
            studentName,
            Email,
            phoneNumber,
            course,
            address,
            password
        } = req.body

        const updatedData = await studentModel.updateOne({ _id: req.query.id }, req.body)

        return res.status(200).json({ isSuccess: true, message: "Student update successfully", updatedData })



    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}

const deleteStudent = async (req, res) => {
    try {
        const deletData = await studentModel.deleteOne({ _id: req.query.id })
        return res.status(200).json({ isSuccess: true, message: "Data deleted successfully", deletData })


    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}

const getStudent = async (req, res) => {
    try {
        const allData = await studentModel.find()

        return res.status(200).json({ isSuccess: true, message: "get all successfully", allData })

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}
module.exports = { addStudent, updateStudent, deleteStudent, getStudent }