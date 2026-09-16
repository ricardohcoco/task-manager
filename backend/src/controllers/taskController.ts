import type { Request, Response } from "express";
import connection from "../database/connection.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface TaskRow extends RowDataPacket {
    id: number;
    title: string;
    completed: number;
}

export async function getTasks(req: Request, res: Response) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Usuário não autenticado"
            });
        }

        const [tasks] = await connection.query<TaskRow[]>(
            "SELECT id, title, completed FROM tasks WHERE user_id = ?",
            [userId]
        );

        const formattedTasks = tasks.map((task) => ({
            id: task.id,
            title: task.title,
            completed: Boolean(task.completed),
        }));

        res.json(formattedTasks);
    } catch {
        res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
}

export async function createTask(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Título é obrigatório"
            });
        }

        await connection.query(
            "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
            [title, userId]
        );

        res.status(201).json({
            message: "Tarefa criada com sucesso!"
        });
    } catch {
        res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
}

export async function updateTask(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { title, completed } = req.body;

        if (!userId) {
            return res.status(401).json({
                message: "Usuário não autenticado"
            });
        }

        if (!title || typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Título e status são obrigatórios"
            });
        }

        const [result] = await connection.query<ResultSetHeader>(
            `
            UPDATE tasks
            SET title = ?, completed = ?
            WHERE id = ? AND user_id = ?
            `,
            [title, completed, id, userId]
        );
       
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        res.json({
            message: "Tarefa atualizada com sucesso!"
        });
    } catch {
        res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
}

export async function deleteTask(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                message: "Usuário não autenticado"
            });
        }

        const [result] = await connection.query<ResultSetHeader>(
            `
            DELETE FROM tasks
            WHERE id = ? AND user_id = ?
            `,
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        res.json({
            message: "Tarefa excluída com sucesso!"
        });
    } catch {
        res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
}