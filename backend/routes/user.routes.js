// Exports the routes for the api endpoints and what each one does 
// for the app setting to use in server.js

module.exports = app => {

    // setting of variables - userController to hook the user.controller file
    // router to use the express Router() function

    const userController = require("../controllers/user.controller");
    var router = require("express").Router();

    // Sets endpoint / to be a get command to return a json message of test

    router.get("/", function (req, res, next) {
        res.json({ message: "test" });
    });

    // Sets endpoint /User to be a POST command to add something to the db (see controller for definition)
    // Another get command on endpoint /User/All to return all items in the db
    router.post("/user/create", userController.createUser);
    router.get("/user/", userController.findAllUsers); 
    router.get("/user/id", userController.findOneUser);
    router.put("/user/Update/:id", userController.updateUser);
    router.delete("/user/Delete/:id", userController.deleteOneUser);

    // Sets the starting endpoint for the router to be /
    // for example localhost://5000/ will return "test"
    // and localhost://5000/User will be a post
    app.use('/', router);
};


