// import mongoose module
const mongoose = require("mongoose");

// import mongoose-unique-validator module
const uniqueValidator = require("mongoose-unique-validator");

// create userSchema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type:String, unique: true},
    pwd: String,
    phone: { type: String, unique: true},
    home: String,
    role: String,
    speciality: String,   //teacher***
    phoneChild: String,   //parent
    img: String,          //student
    status : String,
})

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

// Affect userSchema to model name User
const user = mongoose.model("User", userSchema);
// Make user exportable
module.exports = user;