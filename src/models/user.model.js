const mongoose = require("mongoose");
const { compareSync, hashSync, genSaltSync } = require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password
    return user
}

UserSchema.methods.comparePasswords = function (password) {

    return compareSync(password, this.password)
}

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password") === false) {
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt)
    user.password = hashedPassword
    return next();


})

module.exports = mongoose.model("user", UserSchema)