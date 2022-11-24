const db = require("../models");
const AcademicAdvisor = db.academicAdvisors;
const UserController =  require('./user.controller');
const errors = require('./utils/errors.controller');
const studentController = require('./student.controller');

exports.createAdvisor = async(req,res) => {
    if(!req.body) {return err => errors.error400(err, res)};

    const user = await UserController.ExtendsUserCreate(req, res);
    if(!user) {return err => errors.error500(err, res)};

    const academicAdvisor = new AcademicAdvisor ({
        academicAdvisorID: req.body.academicAdvisorID,
        userRef: user,
    });

    academicAdvisor.save(academicAdvisor).then( data => {
        res.send(data);
    }).catch(err => errors.error500(err, res));
};

exports.findAllAdvisors = (req,res) => {
    AcademicAdvisor.find().populate({path: "userRef", model: "user"}).then(data => {
        res.send(data);
    }).catch(err => errors.error500(err, res));
};

exports.findOneAdvisor = (req, res) => {
    AcademicAdvisor.findOne({ academicAdvisorID: req.params.id }).populate({path: "userRef", model: "user"}).then(data => {
        if(!data) {return err => errors.error404(err, res)}
        else {
            res.send(data);
        };
    }).catch(err => errors.error500(err, res));
};

exports.deleteAdvisor = async (req, res) => {
    const advisordata = await AcademicAdvisor.findOne({ academicAdvisorID: req.params.id });
    if(!advisordata) {return err => errors.error404(err, res)};

    UserController.ExtendsUserDelete(advisordata, res);
    AcademicAdvisor.findByIdAndDelete(advisordata._id).then(
        res.send({message: "Advisor: " + advisordata.academicAdvisorID + " And User: " + advisordata.userRef + " were Deleted"}))
        .catch(err => errors.error500(err, res));
};

exports.updateAdvisorUser = async (req,res) => {
    if(!req.body) {return err => errors.error400(err,res)};
    const advisordata = await AcademicAdvisor.findOne({academicAdvisorID: req.params.id});
    if(!advisordata) {return err => errors.error404(err, res)};

    UserController.ExtendsUserUpdate(advisordata, req, res);
}

exports.updateAdvisorStudentsList = async(req,res) => {
    if(!req.body) {return err => errors.error400(err,res)};
    const advisordata = await AcademicAdvisor.findOne({academicAdvisorID: req.params.id});
    if(!advisordata) {return err=> errors.error404(err, res)};
    const studentdata = await studentController.extendsStudentFind(req, res);

    studentController.updateStudentAdvisor(studentdata._id, advisordata._id, res);
    AcademicAdvisor.findByIdAndUpdate(advisordata._id, {$push: {"students": studentdata._id}}).then(
        res.send({message: "Updated advisor: " + advisordata.academicAdvisorID + " with student: " + studentdata.studentID}))
        .catch(err => errors.error500(err, res));

    
};

exports.extendsacademicAdvisorFind = (req,res) => {
    if(!req.body) {return err => errors.error400(err,res)};
    const advisordata = AcademicAdvisor.findOne({academicAdvisorID: req.body.academicAdvisorID});
    if(!advisordata) {return err => errors.error404(err, res)}
    else {
        return advisordata;
    };
};