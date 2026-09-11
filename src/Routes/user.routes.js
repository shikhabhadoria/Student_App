import express from "express";
import { deleteUserById, getAllUsers, updateUserById } from "../controllers/user.controller.js"
import { protect, authorize } from "../../middlewares/auth.middleware.js";
const router = express.Router();


router.delete("/:id", protect , authorize("user"), deleteUserById);
router.get("/", protect , authorize("user"), getAllUsers);
router.get("/:id", protect , authorize("user"), updateUserById);

export default router;