const express = require('express');
const { 
  addQuiz, 
  updateQuiz, 
  deleteQuiz, 
  deleteAllQuizzes, 
  deleteQuizzesByFileName, 
  getAllQuizzes, 
  getQuizzesByFileName, 
  uploadExcel 
} = require('../controllers/quizController');

const router = express.Router();

// Add a new quiz
router.post('/', addQuiz);

// Update a quiz by ID
router.put('/', updateQuiz);

// Delete a quiz by ID
router.delete('/', deleteQuiz);

// Delete all quizzes
router.delete('/all', deleteAllQuizzes);

// Delete quizzes by fileName
router.delete('/file', deleteQuizzesByFileName);

// Get all quizzes (grouped by fileName and Course)
router.get('/', getAllQuizzes);

// Get quizzes by fileName
router.get('/file', getQuizzesByFileName);

// Upload quizzes via Excel
router.post('/upload', uploadExcel);

module.exports = router;