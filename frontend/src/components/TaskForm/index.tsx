import styles from "./TaskForm.module.css";

type TaskFormProps = {
    title: string;
    creating: boolean;
    onTitleChange: (title: string) => void;
    onSubmit: (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
};

export default function TaskForm({
    title,
    creating,
    onTitleChange,
    onSubmit,
}: TaskFormProps) {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input className={styles.input}
            type="text"
            placeholder="Digite uma nova tarefa"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            />

            <button className={styles.button} type="submit" disabled={creating}>
                {creating ? "Adicionando" : "Adicionar"}
            </button>
        </form>
    );
}