const db = require("../models");
const errors = require("./utils/errors.controller");
const Module = db.modules;
const TutorController = require("./tutor.controller");
const userController = require("./user.controller");
const studentController = require("./student.controller");


exports.createModule = async (req, res) => {
    if (!req.body) { return err => errors.error400(err, res) };

    const tutordata = TutorController.extendsTutorFind(req, res);
    if (!tutordata) {
        const module = new Module({
            moduleName: req.body.moduleName,
            moduleID: req.body.moduleID,
        });
        module.save(module).then(data => {
            res.send(data);
        }).catch(err => errors.error500(err, res));
    }
    else {
        if (tutordata.canEditModule == true) {
            const module = new Module({
                moduleName: req.body.moduleName,
                moduleID: req.body.moduleID,
                moduleLeader: tutordata._id
            });
            module.save(module).then(data => {
                res.send(data);
            }).catch(err => errors.error500(err, res));
        }
        else {
            const module = new Module({
                moduleName: req.body.moduleName,
                moduleID: req.body.moduleID,
                moduleLeader: tutordata._id
            });
            const tutorchanges = { "canEditModule": true, "canEditCourse": false };
            userController.ExtendsUserToggles(tutordata, tutorchanges, res);
            module.save(module).then(data => {
                res.send(data);
            }).catch(err => errors.error500(err, res));
        };
    };
};

exports.findAllModules = (req, res) => {
    Module.find().populate({ path: "students", model: "student" })
        .populate({ path: "moduleLeader", model: "tutors" })
        .populate({ path: "classes", model: "class" })
        .populate({ path: "tutors", model: "tutor" })
        .then(data => { res.send(data) }).catch(err => errors.error500(err, res));
};

exports.findOneModule = (req, res) => {
    Module.findOne({ moduleID: req.params.id })
        .populate({ path: "students", model: "student" })
        .populate({ path: "moduleLeader", model: "tutors" })
        .populate({ path: "classes", model: "class" })
        .populate({ path: "tutors", model: "tutor" })
        .then(data => {
            if (!data) { return err => errors.error404(err, res) }
            else {
                res.send(data);
            }
        }).catch(err => { errors.error500(err, res) });
};

exports.returnStudentList = async (req,res) => {
    const studentdata = studentController.extendsStudentFind(req, res);
    if(!studentdata) {return err => errors.error404(err, res)};
    const studentList = await Module.find({moduleID: req.params.id, "students": {"$in": studentdata._id}});
    if(!studentList) {return err => errors.error404(err, res)}
    else {
        return studentList;
    };
}

exports.getModuleAttendance = (req, res) => {
    ///??? depends if needed
};