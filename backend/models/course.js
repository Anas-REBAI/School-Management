// import monggose module
const mongoose = require("mongoose");

// create courseSchema
const courseSchema = mongoose.Schema({
    name: String , 
    description: String,
    dure: String,
    teacherId: {type : mongoose.Schema.Types.ObjectId, ref:"User"},
})

// Affect courseSchema to model name Course
const course = mongoose.model("Course", courseSchema);
// Make course exportable
module.exports = course;
