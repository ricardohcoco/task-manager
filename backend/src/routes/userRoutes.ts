import { Router } from "express";
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCurrentUser 
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = Router();

userRoutes.get("/me", authMiddleware, getCurrentUser);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.post("/", createUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;