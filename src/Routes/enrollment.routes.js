import express from "express";
import { assignCourseToStudent, getAllStudentWithCourseId, removeAssignment, getAllCourseWithStudentId } from "../controllers/enrollement.controller.js";


const router = express.Router();

router.post("/", assignCourseToStudent);
router.delete("/:studentId/:courseId", removeAssignment)
router.get("/course/:courseId", getAllStudentWithCourseId)
router.get("/student/:studentId", getAllCourseWithStudentId)


export default router;