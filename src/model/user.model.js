import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "name is required"],
            trim: true
        },
        email: {
            type:String,
            required:[true, "email is required"],
            trim: true,
            lowercase: true,
            unique:true
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: [6, "password should be of 6 digits"],
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    }, {timestamps: true},
);

const User = mongoose.model("User", userSchema);

export default User;

