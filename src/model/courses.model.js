import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is rquired"],
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        durationWeeks: {
            type: Number,
            required: true,
            min:1
        }
    }, {timestamp: true}
)

const Course = mongoose.model("Course", courseSchema);

export default Course;