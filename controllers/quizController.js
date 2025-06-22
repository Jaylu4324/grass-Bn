const quizModel = require('../models/quizModel')

const addQuiz = async (req, res) => {
    try {
        let { Question,
            Options,
            Course,
            CorrectAnswer } = req.body

        const data = new quizModel({
            Question,
            Options,
            Course,
            CorrectAnswer
        })

        const adeddata = await data.save()
        return res.status(201).json({ isSuccess: true, message: "Quiz added successfully", adeddata })

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}


const updateQuiz = async (req, res) => {
    try {
        let { Question,
            Options,
            Course,
            CorrectAnswer } = req.body

        const updatedData = await quizModel.updateOne({ _id: req.query.id }, req.body)
        return res.status(200).json({ isSuccess: true, message: "Quiz updated successfully", updatedData })
    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}

const deleteQuiz = async (req, res) => {
    try {
        const deletedData = await quizModel.deleteOne({ _id: req.query.id })

        return res.status(200).json({ isSuccess: true, message: "Quiz deleted successfully", deletedData })

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}


const getQuiz = async (req, res) => {
    try {

        const allQuiz = await quizModel.find()
        return res.status(200).json({ isSuccess: true, message: "All Quiz ", allQuiz })

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })

    }
}
module.exports = { addQuiz, updateQuiz, deleteQuiz, getQuiz }