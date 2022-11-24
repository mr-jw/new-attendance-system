module.exports = app => {
    var academicAdvisorController = require("../controllers/academicadvisor.controller")
    var router = require("express").Router();

    router.post("/Advisor/Create", academicAdvisorController.createAdvisor);
    router.get("/Advisor/All", academicAdvisorController.findAllAdvisors);
    router.get("/Advisor/Find/:id", academicAdvisorController.findOneAdvisor);
    router.put("/Advisor/Update/:id", academicAdvisorController.updateAdvisorUser);
    router.put("/Advisor/Update/Students/:id", academicAdvisorController.updateAdvisorStudentsList);
    router.delete("/Advisor/Delete/:id", academicAdvisorController.deleteAdvisor);

    app.use("/", router);
}