const db = require("../models");
const UserController = require("../controllers/user.controller");
const errors = require("./utils/errors.controller");
const Tutor = db.tutors;

exports.createTutor = async (req, res) => {
    var err;
    if (!req.body) { return errors.error400(err, res); };

    const user = await UserController.ExtendsUserCreate(req, res);
    if(!user) {return err => errors.error500(err, res)};
    const tutor = new Tutor({
        tutorID: req.body.tutorid,
        userRef: user
    });

    tutor.save(tutor).then(data => {
        res.send(data);
    }).catch(err => errors.error500(err, res));
};

exports.findAllTutors = (req, res) => {
    Tutor.find().populate({ path: "userRef", model: "user" }).then(data => {
        res.send(data);
    }).catch(err => errors.error500(err, res));
};

exports.findOneTutor = (req, res) => {
    Tutor.findOne({ tutorId: req.params.id }).populate({ path: "userRef", model: "user" }).then(data => {
        if (!data) { return err => errors.error404(err, res) }
        else {
            res.send(data);
        }
    }).catch(err => errors.error500(err, res));
};

exports.deleteTutor = async (req, res, next) => {
    var err;
    const tutordata = await Tutor.findOne({ tutorId: req.params.id });
    if (!tutordata) { return errors.error404(err, res) };

    UserController.ExtendsUserDelete(tutordata);
    Tutor.findByIdAndDelete(tutordata._id).then(res.send({ message: "User & Tutor: " + findTutor + " Deleted" }))
        .catch(err => errors.error400(err, res));
};

exports.updateTutorUser = async (req, res) => {
    if (!req.body) { return errors.error400(err, res) };
    const tutordata = await Tutor.findOne({ tutorId: req.params.id });
    if (!tutordata) { return errors.error404(err, res) };

    UserController.ExtendsUserUpdate(tutordata, req, res);
};

exports.updateModuleList = async (req, res) => {
    if (!req.body) { return err => errors.error400(err, res) };
    const tutordata = await Tutor.findOne({ tutorId: req.params.id });
    if (!tutordata) { return err => errors.error404(err, res) };

    Tutor.findByIdAndUpdate(tutordata._id, { "$push": { "modules": req.body.modules } }).then(res.send({ message: "Tutor: " + tutordata.tutorId + " has updated module list" }));
}

exports.extendsTutorFind = (req, res) => {
    if (!req.body) {return err => errors.error400(err, res)}
    else {
        return tutordata = Tutor.findOne({tutorID: req.body.tutorID});
    };
};