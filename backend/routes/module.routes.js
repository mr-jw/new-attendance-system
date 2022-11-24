module.exports = app => {

    const moduleController = require("../controllers/module.controller");
    var router = require("express").Router();

    router.post("/Module/Create", moduleController.createModule);
    router.get("/Module/All", moduleController.findAllModules);
    router.get("/Module/Find/:id", moduleController.findOneModule);
    app.use("/", router);
}