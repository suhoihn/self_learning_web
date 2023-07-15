const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    image: {type: String,}
});

const answerInfoSchema = new mongoose.Schema({
    answerType: {type: String,},
    answers: [{
        answerImage: imageSchema,
        specificAnswerId: {type: String},
        //numAns: {type: Number},
        //unit: {type: String},
        //marks: {type: Number
        //instruction: {type: String},
    }],
});
const answerSchema = new mongoose.Schema({
    answerID: {
        type: Number,
        required: true,
        unique: true,
    },

    answer: answerInfoSchema,
    //Chapter: [{type: Number}],
    //Difficulty: {type: String}, // easy, medium, hard
    //Paper: {type: String},
    //Timezone: {type: Number},
});

module.exports = mongoose.model("answer", answerSchema, "Answers");