import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const taskRoutes = Router();

taskRoutes.get("/", authMiddleware, getTasks);
taskRoutes.post("/", authMiddleware, createTask);
taskRoutes.put("/:id", authMiddleware, updateTask);
taskRoutes.delete("/:id", authMiddleware, deleteTask);


export default taskRoutes;