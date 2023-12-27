// import monggose module
const mongoose = require("mongoose");

// create classSchema
const classSchema = mongoose.Schema({
    name: String ,
    courseId: {type : mongoose.Schema.Types.ObjectId, ref:"Course"},
    teacherId: {type : mongoose.Schema.Types.ObjectId, ref:"User"},
    studentsId: [{type : mongoose.Schema.Types.ObjectId, ref:"User"}],
})

// Affect classSchema to model name Class
const classe = mongoose.model("Class", classSchema);
// Make course exportable
module.exports = classe;
