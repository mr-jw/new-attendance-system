
module.exports = app => {
    const registerController = require("../controllers/register.controller");
    const router = require("express").Router();

    router.post("/Register/Add/:id", registerController.addRegisterItem);
    router.delete("/Register/DeleteItem/:id", registerController.deleteRegisterItem);
    router.put("/Register/DeleteItem/:id", registerController.editRegisterItem);
    router.get("/Register/getAll/", registerController.getAll);
    app.use("/", router);
}