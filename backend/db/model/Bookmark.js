const mongoose = require("mongoose");

// UNUSED NOW!
const BookmarkSchema = new mongoose.Schema({
    questionId: { type: Number, required: true, },
    username: {type: String, required: true}
})

module.exports = mongoose.model("bookmark", BookmarkSchema, "Bookmarks");