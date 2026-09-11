import Enrollment from "../model/enrollement.model.js"
import Student from "../model/student.model.js";
import Course from "../model/courses.model.js"


// Assign Course To Student																									
// Remove Course Assignment																									
																									
// Get All Courses Assigned To Student																									
// Get All Students In A Course		

export const assignCourseToStudent = async(req, res) => {
    try{
    const { studentId, courseId } = req.body;

    if(!studentId || !courseId){
        return res.status(400).json({message: "requirements are not fullfilled"})
    }
 
    const studentWithId = await Student.findById(studentId);

    if(!studentWithId){
        return res.status(404).json({message:"student not found"})
    }

    const courseWithId = await Course.findById(courseId);
    
    if(!courseWithId){
        return res.status(404).json({message: "course not found"})
    }
    
    const isAlreadyAssigned = await Enrollment.findOne({
        studentid:studentId,
        courseid:courseId
    });

    if(isAlreadyAssigned){
        return res.status(400).json({message: "this course is already assigned to student"})
    }

    const courseToStudent = await Enrollment.create({
        studentid:studentId,
        courseid:courseId
    })

    res.status(200).json({message: "course is assined to the student succesfully"}
    
    )
}
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const removeAssignment = async(req, res) => {
    try{
        const { studentId, courseId } = req.params;

        const toRemoveAssignment = await Enrollment.deleteOne({
            studentid: studentId,
            courseid: courseId
        })

        console.log(toRemoveAssignment)

        if(toRemoveAssignment.deletedCount === 0){
            return res.status(400).json({message: "course is not deleted due to misleading information"})
        }

        res.status(200).json({message: "course assignment is deleted successfully"})

    }catch(error){
        res.status(500).json({message: error.message});
    }
}


export const getAllStudentWithCourseId = async(req, res) => {
    try{
        const { courseId } = req.params;

        const existingCourse = await Course.findById(courseId);
        if(!existingCourse){
            return res.status(404).json({message:"course not found"})
        }

        const studentEnrollments = await Enrollment.find({
        courseid: courseId
        }).populate("studentid");

        const students = studentEnrollments.map(
        (studentEnrollments) => studentEnrollments.studentid
        );

        res.status(200).json({
        existingCourse,
        count: students.length,
        students,
        });

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getAllCourseWithStudentId = async(req, res) => {
    try{
            const { studentId } = req.params;

            const existingStudent = await Student.findById(studentId);
            if(!existingStudent){
                return res.status(404).json({message: "student not found"})
            }

            const courseEnrollments = await Enrollment.find({
                studentid: studentId
            }).populate("courseid")

           
            const courses = courseEnrollments.map(
                (courseEnrollments) => courseEnrollments.courseid
            )

            res.status(200).json({
                existingStudent,
                counts: courses.length,
                courses
            })

    }catch(error){
        res.status(500).json({message: error.message});
    }
}



export const removeAssignmentByEnrollments = async(req, res) => {
    try{
    const { enrollmentId } = req.params;

    const removeAssignment = await Enrollment.deleteOne({enrollmentId});
    if(!removeAssignment){
        return res.status(400).json({message: "enrollmentId is wrong"})
    }

    return res.status(200).json({message: "enrollment is removed successfully!"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getassignmentByEnrollmentId = async(req, res) => {
    try{
    const { enrollmentId } = req.params;

    const assignment = await Enrollment.findOne({enrollmentId});
    if(!assignment){
        return res.status(400).json({message:"enrollmentId is misleading"})
    }

    return res.status(200).json({
        message: "your enrollment for the given enrollmentId",
        studentid: assignment.studentid,
        courseid: assignment.courseid
    })
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}






