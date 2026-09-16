import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import type { User } from "../../types/user";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getCurrentUser,
} from "../../services/api";
import TaskItem from "../../components/TaskItem";
import TaskForm from "../../components/TaskForm";
import styles from "./Tasks.module.css";

type TasksProps = {
  onLogout: () => void;
};

export default function Tasks({ onLogout }: TasksProps) {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [tasksData, userData] = await Promise.all([
          getTasks(),
          getCurrentUser(),
        ]);

        setTasks(tasksData);
        setUser(userData);
        setError("");
      } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
          onLogout();
          return;
        }
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [onLogout]);

  async function handleSubmit(
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      setCreating(true);

      await createTask(title.trim());

      const updateTasks = await getTasks();

      setTasks(updateTasks);
      setTitle("");
      setError("");
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        onLogout();
        return;
      }

      setError("Erro ao criar tarefa");
    } finally {
      setCreating(false);
    }
  }

  async function handleToggleTask(task: Task) {
    try {
      await updateTask(task.id, task.title, !task.completed);

      const updateTasks = await getTasks();

      setTasks(updateTasks);
      setError("");
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        onLogout();
        return;
      }

      setError("Erro ao atualizar tarefa");
    }
  }

  async function handleDeleteTask(id: number) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);

      const updatedTasks = await getTasks();

      setTasks(updatedTasks);
      setError("");
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        onLogout();
        return;
      }
      setError("Erro ao excluir tarefa");
    }
  }

  async function handleEditTask(task: Task, newTitle: string) {
    try {
      await updateTask(task.id, newTitle, task.completed);

      const updatedTasks = await getTasks();

      setTasks(updatedTasks);
      setError("");
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        onLogout();
        return;
      }

      setError("Erro ao editar tarefa");
    }
  }

  if (loading) {
    return <p>Carregando tarefas...</p>;
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Minhas Tarefas</h1>

        <button className={styles.logoutButton} onClick={onLogout}>
          Sair
        </button>
      </header>

      <section className={styles.content}>
        <h2 className={styles.title}>Olá, {user?.name}!</h2>

        <p className={styles.subtitle}>
          Organize suas tarefas e acompanhe o que precisa ser feito.
        </p>

        <TaskForm
          title={title}
          creating={creating}
          onTitleChange={setTitle}
          onSubmit={handleSubmit}
        />

        <div className={styles.filters}>
          <button
            className={
              filter === "all" ? styles.activeFilter : styles.filterButton
            }
            onClick={() => setFilter("all")}
          >
            Todas
          </button>

          <button
            className={
              filter === "pending" ? styles.activeFilter : styles.filterButton
            }
            onClick={() => setFilter("pending")}
          >
            Pendentes
          </button>

          <button
            className={
              filter === "completed" ? styles.activeFilter : styles.filterButton
            }
            onClick={() => setFilter("completed")}
          >
            Concluídas
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {filteredTasks.length === 0 ? (
          <p className={styles.empty}>Nenhuma tarefa cadastrada.</p>
        ) : (
          <div className={styles.taskList}>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
