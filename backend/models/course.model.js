module.exports = mongoose => {
    var Course = mongoose.model(
        "course",
        mongoose.Schema(
            {
                courseName: {
                    type: String,
                    required: true,
                },
                courseID: {
                    type: String,
                    required: true,
                    unique: true
                },
                students: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                    unique: true,
                }],
                courseLeader: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Tutor",
                },
                modules: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Modules",
                    unique: true
                }]
            }
        )
    );
    return Course;
};