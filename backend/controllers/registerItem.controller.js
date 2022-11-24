const errors = require("./utils/errors.controller");
const db = require("../models");
const RegisterItem = db.registerItem;
const StudentController = require("./student.controller");

exports.createRegisterItem = async (req, res) => {
    const studentdata = await StudentController.extendsStudentFind(req, res);
    const registerItem = new RegisterItem({
        students: studentdata._id,
        attended: req.body.attended
    });
    registerItem.save(registerItem).then(console.log("registerItemCreated")).catch(err => errors.error500(err, res));
    return registerItem;
};

exports.findOne = async (req, res) => {
    const registeritem = RegisterItem.findById(req._Id);
    if(!registeritem) {return err => errors.error404(err, res)}
    else {
        return registeritem;
    };
};

exports.deleteRegisterItem = (req, res) => {
    RegisterItem.findByIdAndDelete(req).then(data => {
        if(!data) {return err => errors.error404(err, res)}
        else {
            console.log("registerItem: " + req._id + " has been deleted");
            return
        };
    })
};

exports.updateRegisterItem = (req, val, res) => {
    RegisterItem.findByIdAndUpdate(req, {attended: val.body.attended}).then(data => {
        if(!data) {return err => errors.error404(err, res)}
        else {
            console.log("registerItem: " + req._id + "has been updated");
            return
        };
    });
};

exports.findAll = (req, res) => {
    const registerdata = RegisterItem.find().populate({path: "students", model: "student"});
    return registerdata;
};

exports.returnStudentAttendanceData = async(req, res) => {
    const studentdata = StudentController.extendsStudentFind(req, res);
    const studentRegisterData = RegisterItem.find({studentid: studentdata._id});
    if(!studentRegisterData) {return err => errors.error404(err,res)}
    else {
        return studentRegisterData;
    };
};