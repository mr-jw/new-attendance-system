module.exports = mongoose => {
    var Class = mongoose.model(
        "class",
        mongoose.Schema(
            {
                classID: {
                    type: String,
                    required: true,
                    unique: true
                },
                className: {
                    type: String,
                    required: true,
                },
                students: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                }],
                type: {
                    type: String,
                    enum: ['Lecture', 'Tutorial'],
                    default: 'Tutorial'
                },
                tutorRef: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Tutor",
                },
                register: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Register",
                }
            }
        )
    );
    return Class;
};