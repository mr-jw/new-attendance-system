module.exports = app => {
    var studentController = require('../controllers/student.controller');
    var router = require("express").Router();

    router.post("/Student/Create", studentController.createStudent);
    router.get("/Student/All", studentController.findAllStudents);
    router.get("/Student/Find/:id", studentController.findOneStudent);
    router.put("/Student/Update/:id", studentController.updateStudentUser);
    router.put("/Student/Update/Advisor/:id", studentController.updateStudentAdvisor);
    router.delete("/Student/Delete/:id", studentController.deleteStudent);
    app.use("/", router);
}

