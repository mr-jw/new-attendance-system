const db = require("../models");
const errors = require("./utils/errors.controller");
const TutorController = require("./tutor.controller");
const StudentController = require("./student.controller");
const userController = require("./user.controller");
const Course = db.courses;

exports.createCourse = async (req, res) => {
    if (!req.body) { return err => errors.error400(err, res) };

    const tutordata = await TutorController.extendsTutorFind(req, res);
    if (!tutordata) {
        const course = new Course({
            courseName: req.body.courseName,
            courseID: req.body.courseID,
        });

        course.save(course).then(data => { res.send(data) }).catch(err => errors.error500(err, res));
    }
    else {
        const course = new Course({
            courseName: req.body.courseName,
            courseID: req.body.courseID,
            courseLeader: tutordata._id
        });
        const tutorchanges = { "canEditModule": true, "canEditCourse": true };
        userController.ExtendsUserToggles(tutordata, tutorchanges, res);
        course.save(course).then(data => { res.send(data) }).catch(err => errors.error500(err, res));
    };
};

exports.findAllCourses = (req, res) => {
    Course.find().populate({ path: "courseLeader", model: "tutor" })
        .populate({ path: "modules", model: "module" })
        .populate({ path: "students", model: "student" })
        .then(data => res.send(data))
        .catch(err => errors.error500(err, res));
};

exports.findOneCourse = (req, res) => {
    Course.findOne({ courseID: req.params.id }).populate({ path: "courseLeader", model: "tutor" })
    .populate({ path: "modules", model: "module" })
    .populate({ path: "students", model: "student" })
    .then(data => {
        if (!data) { return err => errors.error404(err, res) }
        else { res.send(data) };
    }).catch(err => errors.error500(err, res));
};


exports.deleteCourse = (req, res) => {
    if(!Course.findOne({courseID: req.params.id})) {return err => errors.error404(err,res)};

    Course.findOneAndDelete({courseID: req.params.id}).then(req.send({message: "Course: " + req.params.id + " has been deleted"}))
    .catch(err => errors.error500(err,res));
};

exports.findStudent = async (req,res) => {
    const studentdata = await StudentController.extendsStudentFind(req);
    const coursestudentdata = await Course.findOne({courseID: req.body.courseID, "students": {"$in": studentdata._id}});
    if(!coursestudentdata) {return err => errors.error404(err, res)}
    else {
        return coursestudentdata
    };
};


exports.getCourseAttendance = (req, res) => {
    /// ???? depends if needed
};
