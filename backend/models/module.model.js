module.exports = mongoose => {
    var Module = mongoose.model(
        "module",
        mongoose.Schema(
            {
                moduleName: {
                    type: String,
                    required: true,
                },
                moduleID: {
                    type: String,
                    required: true,
                    unique: true
                },
                students: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student"
                }],
                moduleLeader: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Tutor",
                },
                classes: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Class",
                    unique: true
                }],
                tutors: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Tutor",
                    unique: true
                }]
            }
        )
    );
    return Module;
};