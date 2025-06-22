const exxpress = require('express');

const { addQuiz, updateQuiz, deleteQuiz, getQuiz } = require('../controllers/quizController');
const Router = exxpress.Router();

Router.post("/add", addQuiz);
Router.put("/update", updateQuiz);  
Router.delete("/delete", deleteQuiz);
Router.get("/all", getQuiz);




module.exports = Router;
