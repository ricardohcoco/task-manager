import { useState } from "react";
import type { Task } from "../../types/task";
import styles from "./TaskItem.module.css";

type TaskItemProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task, newTitle: string) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  function handleSave() {
    const newTitle = editedTitle.trim();

    if (!newTitle) {
      return;
    }

    onEdit(task, newTitle);
    setIsEditing(false);
  }

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        {isEditing ? (
          <input
            className={styles.editInput}
            type="text"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
        ) : (
          <>
            <p
              className={`${styles.title} ${
                task.completed ? styles.completedTitle : ""
              }`}
            >
              {task.title}
            </p>

            <p className={styles.status}>
              {task.completed ? "Concluída" : "Pendente"}
            </p>
          </>
        )}
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button className={styles.saveButton} onClick={handleSave}>
              Salvar
            </button>

            <button
              className={styles.cancelButton}
              onClick={() => {
                setEditedTitle(task.title);
                setIsEditing(false);
              }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.toggleButton}
              onClick={() => onToggle(task)}
            >
              {task.completed ? "Reabrir" : "Concluir"}
            </button>

            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>

            <button
              className={styles.deleteButton}
              onClick={() => onDelete(task.id)}
            >
              Excluir
            </button>
          </>
        )}
      </div>
    </article>
  );
}
