import express from "express";
import { assignCourseToStudent, getAllStudentWithCourseId, removeAssignment, getAllCourseWithStudentId, removeAssignmentByEnrollments, getassignmentByEnrollmentId } from "../controllers/enrollement.controller.js";


const router = express.Router();

router.post("/", assignCourseToStudent);
router.delete("/:studentId/:courseId", removeAssignment)
router.get("/course/:courseId", getAllStudentWithCourseId)
router.get("/student/:studentId", getAllCourseWithStudentId)
router.delete("/:id", removeAssignmentByEnrollments);
router.get("/:id", getassignmentByEnrollmentId)


export default router;