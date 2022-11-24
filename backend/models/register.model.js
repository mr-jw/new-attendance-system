module.exports = mongoose => {
    var Register = mongoose.model(
        "register",
        mongoose.Schema(
            {
                dateTime: {
                    type: Date,
                    required: true,
                },
                attendanceList: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "RegisterItem",
                }]
            }
        )
    );
    return Register;
};