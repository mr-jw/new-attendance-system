module.exports = mongoose => {
    var Student = mongoose.model(
        "student",
        mongoose.Schema(
            {
                studentID: {
                    type: String,
                    unique: true
                },
                userRef: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                academicAdvisor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "AcademicAdvisor"
                }
            }
        )
    );
    return Student;
};