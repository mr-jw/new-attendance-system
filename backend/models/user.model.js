//Exporting the following code for use in other files as mongoose

module.exports = mongoose => {

    // Sets the variable User as a model for mongodb with the name user (table)
    // Also sets that User model to be made of 2 fields - username(as a string) & password(also a string)
    // Returns this
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                username: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                telephone: {
                    type: String
                },
                canEditModule: {
                    type: Boolean,
                    required: true,
                },
                canEditCourse: {
                    type: Boolean,
                    required: true,
                }
            },
        )
    );

    return User;
};