// import "express" module
const express = require("express");

// import "body-parser" module
const bodyParser = require("body-parser");

// import "Bcrypt" module
const bcrypt = require("bcrypt");

// import "multer" module
const multer = require("multer");
const path = require("path");     // module interne (npm i multer = multer + path)

// import "json web token"
const jwt = require('jsonwebtoken');
// import "express-session" (middleware)
const session = require('express-session');

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/ecoleDB');

// creates express application (app)
const app = express();

// app configuration (".use" méthode lel config)
app.use(bodyParser.json());                          // envoyer les objets sous format json
app.use(bodyParser.urlencoded({extended: true}));   // récuperer un objet from request (Post / Put)

// Security configuration
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    
    res.setHeader(
    
    "Access-Control-Allow-Headers",
    
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    
    );
    
    res.setHeader(
    
    "Access-Control-Allow-Methods",
    
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    
    );
    
    next();
    
    });

//  /files: shortcut that replaces /backend/images
app.use('/files', express.static(path.join('backend/images')))

// accepted type (B.E)
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
}

// Multer Configuration (destination, fileName) 
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
    error = null;
    }
    cb(null, 'backend/images')
    },

    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + 
   extension;
    cb(null, imgName);
    }
   });

// Session Configuration
const secretKey = 'your-secret-key';
app.use(session({
secret: secretKey,
}));

// "MODELS" Importation
const User = require("./models/user")
const Course = require("./models/course")
const Class = require("./models/class")
const Note = require("./models/note")

// ***********************************  BUSINESS LOGIC USER ********************************
// business logic : Add User (SignUp)
app.post("/api/users/signUp", multer({ storage: storageConfig }).single('img'), (req, res)=>{
    console.log("here into BL : Add user (SignUp)", req.body);

    // hachage of PWD before save
    bcrypt.hash(req.body.pwd, 10).then((crypto)=>{
    console.log("here crypted PWD", crypto);
    req.body.pwd = crypto;
    // condition on student && teacher
    if(req.body.role === "student" || req.body.role === "teacher"){
        req.body.img = `http://localhost:3000/files/${req.file.filename}`
    }

    if (req.body.role === "parent") {
        // Recherche de l'enfant en fonction du numéro de téléphone du parent
        User.findOne({ phone: req.body.phoneChild, role: "student" })
            .then((student) => {
                if (!student) {
                    // Aucun étudiant correspondant n'a été trouvé
                    res.json({ msg: "Child not found" });
                } else {
                    // L'enfant a été trouvé, vous pouvez continuer à créer le compte parent
                    const x = new User(req.body);
                    x.save((err, doc) => {
                        if (doc) {
                            res.json({ msg: "Added with success" });
                        } else {
                            if (err.errors.phone) {
                                res.json({ msg: "Phone Exists" });
                            }
                        }
                    });
                }
            })
            .catch((error) => {
                // Gérer les erreurs de recherche de l'enfant
                res.status(500).json({ msg: "Error searching for child" });
            });
    }
})
});

// business logic : Login
app.post("/api/users/login", (req, res) => {
    console.log("here into BL: login", req.body);
    let user;
    User.findOne({phone: req.body.phone})
        .then((findedUser) => {
        console.log("here response after search by phone", findedUser);
        if (!findedUser) {
            res.json({msg: "check phone"});
        } else{
            user = findedUser;
            //compare pwd with crypted pwd
            return (bcrypt.compare(req.body.pwd, findedUser.pwd));
        }
        })
        .then((compareResult) => {
            if (!compareResult) {
                res.json({msg : "check pwd"});
            } else {
                if (user.role === "teacher") {
                    // if teacher was confirmed
                    if (user.status === "confirme") {
                        let userToSend = {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            status: user.status, 
                        }
                        // jwt.sign(info du user , secretKey, duré de vie du token) pour la création du token
                        const token = jwt.sign(userToSend, secretKey, {expiresIn: '1h'})
                        res.json({ msg: "welcome", token: token });
                    } else {
                        res.json({ msg: "Non confirmed teacher" });
                    }
                } else {
                    let userToSend = {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                    };
                    const token = jwt.sign(userToSend, secretKey, {expiresIn: '1h'});
                    res.json({ msg: "welcome", token: token });
                }
            }
        })
});

// business logic : get all users
app.get("/api/users", (req, res)=>{
    console.log("here into BL: get all users");
    User.find().then((docs)=> {
        res.json({users: docs});
    });
});

// business logic : get all students
app.get("/api/users/students", (req, res)=>{
    console.log("here into BL: get all students");
        User.find({role:"student"})
            .then((stu)=> {
                res.json({students: stu})
        })  
});

// business logic : get all teachers
app.get("/api/users/teachers", (req, res)=>{
    console.log("here into BL: get all teachers");
        User.find({role:"teacher"}).then((tea)=> {
            res.json({teachers: tea})
        })
});

// Business Logic: Update Teacher Status
app.patch("/api/users/status", (req, res) => {
    console.log("Here into BL: status teacher update", req.body);
    User.updateOne({ _id: req.body.id }, req.body)
        .then((response) => {
            response.nModified ?
            res.json({ isUpdated: true }) :
            res.json({ isUpdated: false });
    })
});

// business logic : get all parents
app.get("/api/users/parents", (req, res)=>{
    console.log("here into BL: get all parents");
        User.find({role:"parent"}).then((par)=> {
            res.json({parents: par})
        })
});

// business logic : get user by ID
app.get("/api/users/:id", (req, res)=>{
    //  pour recuperer haja ml path coté B.E ==> "req.params."
    console.log("here into BL : Get user By Id", req.params.id);
    User.findOne({_id: req.params.id}).then((doc) => {
        res.json({user : doc});
    })
});

// business logic : update User Profile
app.put("/api/users", (req, res)=>{
    console.log("here into BL : update user profile", req.body);
    User.updateOne({_id: req.body._id}, req.body).then((response) => {
        // console.log("here response after editing", response);
        response.nModified ?
            res.json({isUpddated : true}) :
            res.json({isUpddated : false});
    })
});

// business logic : Delete user By ID
app.delete("/api/users/:id", (req, res)=>{
    console.log("here into BL : delete user by ID", req.params.id);
    User.deleteOne({_id: req.params.id}).then((response)=>{
        response.deletedCount ?
        res.json({msg : "delete user with success"}) :
        res.json({msg: "ERROR 404"})
    })
});

// Business Logic : Search Student By Tel
app.get("/api/users/student/:tel", (req, res) => {
    console.log("Here into BL: Search User By Tel", req.params.tel);

    // Cherchez d'abord l'utilisateur parent par le numéro de téléphone de l'enfant
    User.findOne({ phoneChild: req.params.tel, role: "parent" })
        .then((parent) => {
            if (!parent) {
                res.json({ msg: "Child's phone number of parent not found" });
            } else {
                // Si l'utilisateur parent est trouvé, recherchez ensuite l'utilisateur étudiant par numéro de téléphone
                return User.findOne({ phone: req.params.tel, role: "student" });
            }
        })
        .then((student) => {
            if (!student) {
                res.json({ msg: "Phone number of student not found" });
            } else {
                console.log("User found", student);

                // Utilisez l'_id étudiant trouvé pour chercher ses notes
                return Note.find({ studentId: student._id })
                    .populate("classId")
                    .populate({
                        path: "classId",
                        populate: {
                            path: "teacherId",
                        }
                    })
                    .populate({
                        path: "classId",
                        populate: {
                            path: "courseId",
                        }
                    })
                    .populate("studentId");
            }
        })
        .then((notes) => {
            res.json({ notes: notes });
        })
        .catch((err) => {
            res.status(500).json({ error: "An error occurred while processing the request." });
        });
});


// ***********************************  BUSINESS LOGIC COURSE ****************************

// business logic : Add Course
app.post("/api/courses", (req, res)=>{
    console.log("here into BL : Add Course", req.body);
    const course = new Course(req.body);
    course.save((err, doc)=>{
        if (doc) {
            res.json({msg : "Course added with success"});
        } else {
            res.json({msg : "Failed"});
        }
    })
});

// business logic : get All Courses
app.get("/api/courses", (req, res)=>{
    console.log("here into BL : get all Courses");
    Course.find()
    .populate("teacherId")
    .then((docs)=>{
        res.json({courses: docs});
    })
});

// business logic : get Course By Id
app.get("/api/courses/:id", (req, res)=>{
    console.log("here into BL : get Course By Id", req.params.id);
    Course.findById(req.params.id).then((doc)=>{
        res.json({course: doc})  
    })
});

// business logic : Update "Edit" Course
app.put("/api/courses", (req, res)=>{
    console.log("here into BL : Update", req.body);
    Course.updateOne({_id: req.body}, req.body).then((response)=>{
        response.nModified ?
        res.json({isUpddated : true}) :
        res.json({isUpddated : false})
    })
});

// business logic : Delete Course
app.delete("/api/courses/:id", async (req, res) => {
    console.log("Here into BL: Delete Course", req.params.id);
    try {
        // Suppression du course
        const deletedCourse = await Course.deleteOne({ _id: req.params.id });
        if (deletedCourse.deletedCount === 0) {
            throw new Error("Course not found");
        }

        // Suppression des groups associés
        const deletedClass = await Class.deleteMany({ courseId: req.params.id });
        if (deletedClass.deletedCount === 0) {
            console.log("No Class found to delete");
        }
        res.json({ msg: "Deleted Class && Course with success" });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: "Error" });
    }
})

// Business Logic: show Courses By TeacherId
app.get("/api/courses/teacher/:id", (req, res) => {
    console.log(console.log("Here into BL: show Courses By TeacherId", req.params.id));
    Course.find({ teacherId: req.params.id }).then((docs) => {
        res.json({ courses: docs });
    })
});

// ***********************************  BUSINESS LOGIC Classes ****************************

// business logic : Add Class
app.post("/api/classes", async (req, res) => {
    console.log("Here into BL: Add Classes", req.body);
    try {
        // Vérification de l'existence de l'enseignant
        const teacher = await User.findById(req.body.teacherId);
        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }
        // Vérification de l'existence du cours
        const course = await Course.findById(req.body.courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        let checkError = true;
        // // Vérification de l'existence des étudiants
       
        User.find({ studentId: { $in: req.body.studentsId } }, async (studentId) => {
            const student = await User.findById(studentId);
            if (!student) {
                checkError = false;
            }
        });

        if (checkError) {
            // Création d'un nouveau groupe
            const classe = new Class({
                name: req.body.name,
                courseId: req.body.courseId,
                teacherId: req.body.teacherId,
                studentsId: req.body.studentsId,
            });

            classe.save((err, doc) => {
                if (doc) {
                    // Réponse réussie
                    res.status(201).json({ msg: "Classes created successfully" });
                }
            });

        } else {
            // Response Error
            res.status(201).json({ msg: "Error" });
        }


    } catch (error) {
        res.status(500).json({ msg: "Error creating class", error: error.message });
    }
});

// business logic : get All Classes
app.get("/api/classes", (req, res) => {
    console.log("Here into BL : get all Classes");
    Class.find()
         .populate("courseId")
         .populate("teacherId")
         .populate("studentsId")
         .then((docs) => {
        res.json({ classes: docs });
    })
});

// Business Logic: get classes by TeacherId
app.get("/api/classes/:id", (req, res) => {
    console.log("Here into BL: Get classes by teacherId", req.params.id);
    Class.find({ teacherId: req.params.id })
        .populate("courseId")
        .populate("studentsId")
        .populate("teacherId")
        .then((docs) => {
            console.log("Here classes", docs);
            res.status(200).json({ classes: docs });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error getting classes", error: error.message });
        });
});

// business logic : Edit Class
app.put("/api/classes", (req, res)=>{
    console.log("here into BL : Update class", req.body);
    Class.updateOne({_id: req.body}, req.body).then((response)=>{
        response.nModified ?
        res.json({isUpddated : true}) :
        res.json({isUpddated : false})
    })
});

// business logic : Delete Classes
app.delete("/api/classes/:id", async (req, res) => {
    console.log("Here into BL: Delete classes", req.params.id);

    try {
        // Suppression du groupe
        const classRes = await Class.deleteOne({ _id: req.params.id });

        if (classRes.deletedCount === 0) {
            throw new Error("Class not found");
        }

        // Suppression des bulletins associés
        const noteRes = await Note.deleteMany({ classId: req.params.id });

        if (noteRes.deletedCount === 0) {
            console.log("Note does not exist to delete.");
        }

        res.json({ msg: "Deleted with success" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: "Error" });
    }
});

// ***********************************  BUSINESS LOGIC NOTES ****************************
// Business Logic : Add notes
app.post("/api/notes", async (req, res) => {
    console.log("Here into BL: Add notes", req.body);
    try {
        const user = await User.findById(req.body.studentId);

        if (!user) {
            return res.status(404).json({ msg: "Student not found" });
        }

        else {
            const notes = new Note(req.body);
            await notes.save();
            res.status(400).json({ msg: "notes already exists" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error", error: error.msg });
    }
});

// Business Logic : Get All notes
app.get("/api/notes", (req, res) => {
    console.log("Here into BL: Get All notes");
    Note.find()
        .then((docs) => {
            res.json({ notes: docs });
        })
});

// Business Logic: show notes by student_Id
app.post("/api/notes/student/For/teacher", async (req, res) => {
    try {
        const docs = await Note.find({ classId: req.body.idClass, studentId: req.body.idStudent });
        res.json({ notes: docs });
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

// Business Logic: Update notes
app.put("/api/notes", (req, res) => {
    try {
        console.log("Here into BL: Update notes", req.body);

        // Mettre à jour le notes étudiant avec l'ID spécifié
        Note.updateOne({ _id: req.body.id }, req.body)
            .then((response) => {

            // Vérifier si la mise à jour a modifié des documents
            if (response.nModified > 0) {
                res.json({ isUpdated: true });
            } else {
                res.json({ isUpdated: false });
            }
        })

    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

// Business Logic: get notes by Id-Student
app.get("/api/notes/get/:id", (req, res) => {
    console.log("Here into BL: Get notes by studentId", req.params.id);
    Note.find({ studentId: req.params.id })
        .populate("classId")
        .populate({
            path: "classId",
            populate: {
                path: "teacherId",
            }
        })
        .populate({
            path: "classId",
            populate: {
                path: "courseId",
            }
        })
        .populate("studentId")
        .then((docs) => {
            res.json({ classes: docs });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving classes", error: error.message });
        });
});

// Business Logic: Display note by Id-note
app.get("/api/notes/getNote/:id", (req, res) => {
    console.log(console.log("Here into BL: Get note by Id-note", req.params.id));
    Note.findById(req.params.id).then((docs) => {
        res.json({ note: docs });
    })
});

// make app importable from another files
module.exports = app;