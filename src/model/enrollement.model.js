import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema(
    {
        studentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        courseid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        }
    }, {timestamp: true}
)

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;