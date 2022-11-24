module.exports = mongoose => {
    var RegisterItem = mongoose.model(
        "registerItem",
        mongoose.Schema(
            {
                students: {
                    type: mongoose.Schema.Types.ObjectID,
                    ref: "Student",
                    required: true,
                    unique: true
                },
                attended: {
                    type: Boolean,
                    required: true,
                }
            }
        )
    );
    return RegisterItem;
};