// Contains the search for student ID function
const db = require('../models');
const errors = require("./utils/errors.controller");
const UserController = require("./user.controller");
const academicAdvisorController = require("./academicadvisor.controller");
const Student = db.students;


exports.createStudent = async (req, res) => {
    if (!req.body) { res.send(err => errors.error400(err, res)) };

    const user = await UserController.ExtendsUserCreate(req, res);
    if(!user) { return err => errors.error500(err, res)};
    const student = new Student({
        studentID: req.body.studentID,
        userRef: user,
    });

    student.save(student).then(data => {
        res.send(data)
    }).catch(err => errors.error500(err, res));
};

exports.findAllStudents = (req, res) => {
    Student.find().populate({ path: "userRef", model: "user" }).then(data => {
        res.send(data);
    }).catch(err => errors.error500(err, res));
};

exports.findOneStudent = (req, res) => {
    Student.findOne({ studentID: req.params.id }).populate({ path: "userRef", model: "user" }).then(data => {
        if (!data) { return err => errors.error404(err, res) }
        else {
            res.send(data);
        }
    }).catch(err => errors.error500(err, res));
};

exports.deleteStudent = async (req, res) => {
    const studentdata = await Student.findOne({ studentID: req.params.id });
    if (!studentdata) { return err => errors.error404(err, res) };

    UserController.ExtendsUserDelete(studentdata);
    Student.findByIdAndDelete(studentdata._id).then(res.send({ message: "User and Student for: " + studentdata.studentID + "Deleted" })).catch(err => errors.error500(err, res));
};

exports.updateStudentUser = async (req, res) => {
    if (!req.body) { return err => errors.error400(err, res) };
    const studentdata = await Student.findOne({ studentID: req.params.id });
    if (!studentdata) { return err => errors.error404(err, res) };

    UserController.ExtendsUserUpdate(studentdata, req, res);
};

exports.extendsStudentFind = async(req, res) => {
    if(!req.body) {return err=> errors.error400(err, res)};
    const studentdata = await Student.findOne({studentID: req.body.studentID});
    if(!studentdata) {return err=> errors.error404(err, res)}
    else {
        return studentdata;
    };
};

exports.updateStudentAdvisor = (req, adv, res) => {
    if(!req || !adv) {return err=> errors.error400(err, res)};
    Student.findByIdAndUpdate(req._id, {academicAdvisor: adv._id}).catch(err => errors.error500(err, res));
};