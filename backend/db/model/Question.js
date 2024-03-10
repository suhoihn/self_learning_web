const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    image: {type: String,}
});

const questionInfoSchema = new mongoose.Schema({
    questionType: { type: String }, // singleAns, multiAns, userMultiAns, unscorable etc.

    questionImage: imageSchema,
    subQuestion: [{
        subQuestionImage: imageSchema,
        specificQuestionId: { type: String },
        numAns: { type: Number }, // Number of answers to this question
        unit: { type: String }, // The unit of the question
        marks: { type: Number }, // Marks assigned to this question
        instruction: { type: String }, // Special instruction to this question
        answerSubscripts: { type: Array }, // Answer subscripts (e.g. x, n, a)
    }],
});


// Think of how to implement wrongcount for each user!!!!
// User model --> (questionId, wrongcount) document

const QuestionSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true,
    },

    question: questionInfoSchema,
    chapter: { type: Array },
    difficulty: { type: String }, // Easy, Normal, Hard
    paper: { type: String },
    timezone: { type: Number },
    wrong: { type: Number }, // Number of wrongs in the question
    bookmarked: { type: String }, // Whether or not the question is bookmarked ("true"/"false")
    
    // Unused for now
    season: { type: String } ,// W or S,
    year: { type: Number }, // Year of the paper
});

module.exports = mongoose.model("question", QuestionSchema, "Questions");