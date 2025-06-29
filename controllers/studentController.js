const studentModel = require("../models/studentModel")
const bcrypt = require("bcrypt")

const addStudent = async (req, res) => {
    try {
        let {
            name,
            email,
            number
            ,
            course,
            address,
            
        } = req.body
        
        const existingStudent = await studentModel.findOne({ email })
        if (existingStudent) {
            return res.status(401).json({ isSuccess: false, message: "Email already exist " })
            
        }
        
        const bcryptPasword = bcrypt.hashSync(process.env.studentPassword,10)
        
        const studentData = new studentModel({
            name,
            email,
            number,
            course,
            address,
            password: bcryptPasword
        })



        const isSaved = await studentData.save()
        if (isSaved) {

            return res.status(201).json({ isSuccess: true, message: "Student add successfully" })
        } else {
            return res.status(400).json({ isSuccess: false, message: "Error While Inserting Student" })
        }

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}

const updateStudent = async (req, res) => {


    try {


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