module.exports = mongoose => {
    var AcademicAdvisor = mongoose.model(
        "academicAdvisor",
        mongoose.Schema(
            {
                academicAdvisorID: {
                    type: String,
                    required: true,
                    unique: true
                },
                userRef: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                students: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                    unique: true
                }]
            }
        )
    );
    return AcademicAdvisor;
};