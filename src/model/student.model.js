import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        trim: true,
        required: [true, "first name is required"]
    },
    lastName:{
        type: String,
        trim: true,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        lowercase:true,
        required: [true, "email is required"]
    },
    age: {
        type: Number,
        required: true,
        min:1
    },
    imageUrl: {
            type: String,
            required: true,
    },
    
}, {timestamps:true}
);

const Student = mongoose.model("Student", studentSchema);
export default Student;

//   firstName: String,
//   lastName: String,
//   email: String,
//   age: Number
