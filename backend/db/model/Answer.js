const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    image: { type: String, }
});

const answerInfoSchema = new mongoose.Schema({
    answerType: { type: String,},
    answerImage: imageSchema,
    answerSubscripts: { type: Array },
    specificAnswerID: { type: String },
    answerValues: { type: Array },
});

const answerSchema = new mongoose.Schema({
    answerID: {
        type: Number,
        required: true,
    },

    answer: answerInfoSchema,
});

module.exports = mongoose.model("answer", answerSchema, "Answers");