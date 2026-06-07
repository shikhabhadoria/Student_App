import express from "express";
import { createStudent, deleteStudent, getAllStudent, getStudentById, updateStudent } from "../controllers/student.controller.js";

// import { protect } from "../../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/", createStudent);
router.get("/:id", getStudentById);
router.get("/", getAllStudent);
router.post("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;