module.exports = app => {
    var tutorController = require('../controllers/tutor.controller');
    var router = require("express").Router();

    router.post("/Tutor/Create", tutorController.createTutor);
    router.get("/Tutor/All", tutorController.findAllTutors);
    router.get("/Tutor/Find/:id", tutorController.findOneTutor);
    router.put("/Tutor/Update/:id", tutorController.updateTutorUser);
    router.put("/Tutor/Update/Modules/:id", tutorController.updateModuleList);
    router.delete("/Tutor/Delete/:id", tutorController.deleteTutor);
    app.use("/", router);
}

