import express from "express";
import { addCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/course.controller.js";
// import { protect } from "../../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/", addCourse);
router.get("/:id", getCourseById);
router.get("/", getAllCourses);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);


export default router;