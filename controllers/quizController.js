const quizModel = require('../models/quizModel');
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Add Quiz
const addQuiz = async (req, res) => {
  try {
    const { Question, Options, Course, CorrectAnswer, fileName } = req.body;

    // Validate input
    if (!Question || !Options || !Course || !CorrectAnswer || !fileName) {
      return res.status(400).json({ isSuccess: false, message: 'All fields are required' });
    }
    if (Options.length !== 4) {
      return res.status(400).json({ isSuccess: false, message: 'Exactly 4 options are required' });
    }
    if (!Options.includes(CorrectAnswer)) {
      return res.status(400).json({ isSuccess: false, message: 'Correct answer must be one of the options' });
    }

    // Check for duplicate question within the same file
    const existingQuiz = await quizModel.findOne({
      Question: { $regex: `^${escapeRegex(Question)}$`, $options: 'i' },
      fileName,
    });
    if (existingQuiz) {
      return res.status(400).json({ isSuccess: false, message: 'Question already exists in this file' });
    }

    const data = new quizModel({
      Question,
      Options,
      Course,
      CorrectAnswer,
      fileName,
    });

    const addedData = await data.save();
    return res.status(201).json({ isSuccess: true, message: 'Quiz added successfully', data: addedData });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: 'Internal Server Error', error: error.message });
  }
};

// Update Quiz
const updateQuiz = async (req, res) => {
  try {
    const { Question, Options, Course, CorrectAnswer, fileName } = req.body;
    const quizId = req.query.id;

    // Validate input
    if (!Question || !Options || !Course || !CorrectAnswer || !quizId || !fileName) {
      return res.status(400).json({ isSuccess: false, message: 'All fields and quiz ID are required' });
    }
    if (Options.length !== 4) {
      return res.status(400).json({ isSuccess: false, message: 'Exactly 4 options are required' });
    }
    if (!Options.includes(CorrectAnswer)) {
      return res.status(400).json({ isSuccess: false, message: 'Correct answer must be one of the options' });
    }

    // Check for duplicate question (excluding the current quiz)
    const existingQuiz = await quizModel.findOne({
      Question: { $regex: `^${escapeRegex(Question)}$`, $options: 'i' },
      _id: { $ne: quizId },
      fileName,
    });
    if (existingQuiz) {
      return res.status(400).json({ isSuccess: false, message: 'Question already exists in this file' });
    }

    const updatedData = await quizModel.findByIdAndUpdate(
      quizId,
      { Question, Options, Course, CorrectAnswer, fileName },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ isSuccess: false, message: 'Quiz not found' });
    }

    return res.status(200).json({ isSuccess: true, message: 'Quiz updated successfully', data: updatedData });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: 'Internal Server Error', error: error.message });
  }
};

// Delete Quiz
const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.query.id;
    if (!quizId) {
      return res.status(400).json({ isSuccess: false, message: 'Quiz ID is required' });
    }

    const deletedData = await quizModel.findByIdAndDelete(quizId);
    if (!deletedData) {
      return res.status(404).json({ isSuccess: false, message: 'Quiz not found' });
    }

    return res.status(200).json({ isSuccess: true, message: 'Quiz deleted successfully', data: deletedData });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: 'Internal Server Error', error: error.message });
  }
};

// Delete All Quizzes
const deleteAllQuizzes = async (req, res) => {
  try {
    const result = await quizModel.deleteMany({});
    return res.status(200).json({
      isSuccess: true,
      message: `${result.deletedCount} quizzes deleted successfully`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: 'Internal Server Error', error: error.message });
  }
};

// Delete Quizzes by FileName
const deleteQuizzesByFileName = async (req, res) => {
  try {
    const { fileName } = req.query;
    if (!fileName) {
      return res.status(400).json({ isSuccess: false, message: 'File name is required' });
    }

    const result = await quizModel.deleteMany({ fileName });
    return res.status(200).json({
      isSuccess: true,
      message: `${result.deletedCount} quizzes deleted successfully for file ${fileName}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: 'Internal Server Error', error: error.message });
  }
};

// Get All Quizzes (Grouped by FileName)
const getAllQuizzes = async (req, res) => {
  try {
    // Aggregate quizzes by fileName and Course
    const quizFiles = await quizModel.aggregate([
      {
        $group: {
          _id: { fileName: '$fileName', Course: '$Course' },
          quizzes: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          fileName: '$_id.fileName',
          Course: '$_id.Course',
          count: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({ isSuccess: true, message: 'Quiz files fetched successfully', data: quizFiles });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: 'Internal Server Error', error: error.message });
  }
};

// Get Quizzes by FileName
const getQuizzesByFileName = async (req, res) => {
  try {
    const { fileName } = req.query;
    if (!fileName) {
      return res.status(400).json({ isSuccess: false, message: 'File name is required' });
    }

    const quizzes = await quizModel.find({ fileName });
    return res.status(200).json({ isSuccess: true, message: 'Quizzes fetched successfully', data: quizzes });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: 'Internal Server Error', error: error.message });
  }
};

// Upload Excel
const uploadExcel = async (req, res) => {
  try {
    const { quizzes, course, fileName } = req.body;

    // Validate request
    if (!quizzes || !Array.isArray(quizzes) || quizzes.length === 0 || !course || !fileName) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Quizzes, course, and fileName are required',
      });
    }

    const validQuizzes = [];
    const seenQuestions = new Set();

    for (const quiz of quizzes) {
      // Validate quiz format
      if (
        typeof quiz.Question === 'string' &&
        quiz.Question.trim() !== '' &&
        Array.isArray(quiz.Options) &&
        quiz.Options.length === 4 &&
        quiz.Options.every((opt) => typeof opt === 'string' && opt.trim() !== '') &&
        typeof quiz.CorrectAnswer === 'string' &&
        quiz.Options.includes(quiz.CorrectAnswer)
      ) {
        const normalizedQuestion = quiz.Question.trim();
        const questionKey = normalizedQuestion.toLowerCase();

        // Check for duplicate question in this request
        if (seenQuestions.has(questionKey)) {
          continue;
        }

        // Check for existing question in DB for this file
        const existingQuiz = await quizModel.findOne({
          Question: { $regex: `^${escapeRegex(normalizedQuestion)}$`, $options: 'i' },
          fileName,
        });

        if (!existingQuiz) {
          validQuizzes.push({
            ...quiz,
            Course: course,
            fileName,
          });
          seenQuestions.add(questionKey);
        }
      }
    }

    if (validQuizzes.length === 0) {
      return res.status(400).json({
        isSuccess: false,
        message: 'No valid quiz entries found or all questions already exist',
      });
    }

    // Insert valid quizzes
    const result = await quizModel.insertMany(validQuizzes, { ordered: false });

    return res.status(201).json({
      isSuccess: true,
      message: `${result.length} quizzes uploaded successfully`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: 'An error occurred while uploading quizzes',
      error: error.message,
    });
  }
};

module.exports = {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  deleteAllQuizzes,
  deleteQuizzesByFileName,
  getAllQuizzes,
  getQuizzesByFileName,
  uploadExcel,
};