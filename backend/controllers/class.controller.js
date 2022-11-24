const db = require("../models");
const errors = require("./utils/errors.controller");
const moduleController = require("./module.controller");
const registerController = require("./register.controller");
const studentController = require("./student.controller");

const Class1 = db.classes;

exports.createClass = async (req,res) => {
    if(!req.body) {return err => errors.error400(err, res)};

    const register = await registerController.createRegister(req, res);
    const class1 = new Class1 ({
        classID: req.body.classID,
        className: req.body.className,
        type: req.body.type,
        register: register._id
    });

    class1.save(class1).then(data => {
        res.send(data);
    }).catch(err => errors.error500(err, res));
};

exports.findAllClasses = (req, res) => {
    Class1.find().populate({path: "students", model:"student"})
    .populate({path: "tutor", model: "tutor"})
    .populate({path: "register", model: "register"})
    .then(data=> {
        res.send(data);
    }).catch(err => errors.error500(err, res));
};

exports.findOneClass = (req,res) => {
    Class1.findOne({classID: req.params.classID}).populate({path: "students", model:"student"})
    .populate({path: "tutor", model: "tutor"})
    .populate({path: "register", model: "register"})
    .then(data => {
        if(!data) {return err => errors.error404(err, res)}
        else {res.send(data)};
    }).catch(err => errors.error500(err, res));
};

exports.addStudent = async (req, res) => {
    const studentInfo = await moduleController.returnStudentList(req, res);
    if(!studentInfo)
    Class1.findOneAndUpdate({classID: req.params.classID}, {students: studentInfo._id}).then(data => {
        if(!data) {return err => errors.error404(err, res)}
        else {
            res.send({message: "Module: " + req.params.classID + " has been updated with student: " + studentInfo.studentID});
        }
    });
};

exports.deleteClass = (req, res) => {
    Class1.findOneAndDelete({classID: req.params.id}).then(data => {
        if(!data) {return err => errors.error404(err, res)}
        else {res.send({message: "class: " + res.params.id + " has been deleted"})};
    }).catch(err => errors.error500(err, res));
};

exports.searchStudents = async (req, res) => {
    if(!req.body) {return err => errors.error400(err, res)};
    const studentdata = await studentController.extendsStudentFind(req, res);
    if(!studentdata) {return err => errors.error404(err, res)}
    else {
        const studentlist = await Class1.findOne({classID: req.params.id, "students" :{"$in": studentdata._id}})
        .populate({path: "register", model:"register",
            populate: {path: "attendanceList", model: "registerItem"}
        });
        return studentlist;
    }
};


exports.extendsClassFind = async(req, res) => {
    const classdata = await Class1.findOne({classID: req.body.classID});
    if(!classdata) {return err => errors.error404(err, res)}
    else {return classdata};
};

exports.getAttendanceData = async (req, res) => {
 /// ????
};
