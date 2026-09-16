import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { env } from "../config/env.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API funcionando!"
    });
});

app.use("/users", userRoutes);

app.use(authRoutes);

app.use("/tasks", taskRoutes)

app.listen(env.port, () => {
    console.log(`Servidor rodando na porta ${env.port}`);
});