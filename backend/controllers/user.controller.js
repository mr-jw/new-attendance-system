// Controller that defines the commands in routes
// uses the model and users connection and sets these as vars
// create function is used for posting to the db (needs removing)

const errors = require("./utils/errors.controller");
const db = require("../models");
const User = db.users;

exports.createUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    telephone: req.body.tel ? req.body.tel : "0",
    canEditModule: false,
    canEditCourse: false
  });

  user.save(user)
    .then(data => {
      res.send(data);
    }).catch(err => errors.error500(err, res));
};

// Retrieve all Tutorials from the database.
exports.findOneUser = (req, res) => {
  const findUser = req.params.id;
  User.find({ studentID: findUser }).then(data => {
    if (!data) { err => errors.error404(err, res) }
    else {
      res.send(data);
    }
  }).catch(err => errors.error500(err, res));
};

// Find a single Tutorial with an id
exports.findAllUsers = (req, res) => {
  User.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Animals."
    });
  });
};

exports.updateUser = (req, res, next) => {
  if (!req.body) { return err => errors.error400(err, res) };
  const username = req.params.id;
  if (!User.findOne({ username: username })) { return res.status(404).send({ message: "User is not found" }) };

  User.findOneAndUpdate({ username: username }, req.body)
  .then(data => { res.send(data) })
  .catch(err => errors.error500(err, res));
};

exports.deleteOneUser = (req, res, next) => {
  if (!User.findOne({ username: req.params.id })) { return err => errors.error500(err, res); };

  User.findOneAndDelete({ username: username }).then(res.send({ message: "User Deleted" }));
};

exports.ExtendsUserDelete = (val, res) => {
  var err;
  if (!val) { return error404(err, res) };
  User.findByIdAndDelete(val.userRef).then(console.log("User Deleted"));
  return;
}

exports.ExtendsUserUpdate = (val, req, res) => {
  if (!val) { return err => errors.error400(err, res) };
  User.findByIdAndUpdate(val.userRef, req.body).then(console.log("User Updated")).then(res.send({ message: "User: " + val.userRef + " Updated" }))
    .catch(err => errors.error400(err, res));
}

exports.ExtendsUserToggles = (val, req, res) => {
  if(!val) {return err => errors.error400(err, res)};
  User.findByIdAndUpdate(val.userRef, {"$set": {"canEditCourse": req.canEditCourse, "canEditModule": req.canEditModule}}).then(console.log("User updated"));
  return;
}

exports.ExtendsUserCreate = (val, res) => {

  if (!val) { return err => error400(err, res) };
  const user = new User({
    username: val.body.username,
    password: val.body.password,
    email: val.body.email,
    telephone: val.body.telephone,
    canEditModule: val.body.canEditModule,
    canEditCourse: val.body.canEditCourse
  });

  user.save(user).then(console.log("User obj Created"));
  return user;
}