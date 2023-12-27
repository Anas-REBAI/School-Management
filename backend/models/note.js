// import monggose module
const mongoose = require("mongoose");

// create noteSchema
const noteSchema = mongoose.Schema({
    classId: {type : mongoose.Schema.Types.ObjectId, ref:"Class"},
    studentId: {type : mongoose.Schema.Types.ObjectId, ref:"User"},
    note: Number,
    evaluation: String,
})

// Affect noteSchema to model name Note
const note = mongoose.model("Note", noteSchema);
// Make note exportable
module.exports = note;
