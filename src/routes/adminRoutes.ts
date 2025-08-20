import { Router } from "express";
import { getAllUsers, getAllCourses, deleteUser } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware"; 
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

// router.get("/users", authMiddleware, roleMiddleware, getAllUsers);
// router.get("/courses", authMiddleware, roleMiddleware, getAllCourses);
// router.delete("/users/:userId", authMiddleware, roleMiddleware, deleteUser);

router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.get("/courses", authMiddleware, roleMiddleware(["admin"]), getAllCourses);
router.delete("/users/:userId", authMiddleware, roleMiddleware(["admin"]), deleteUser);


export default router;
