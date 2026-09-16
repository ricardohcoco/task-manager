import { useState } from "react";
import { login } from "../../services/api";
import styles from "./Login.module.css";

type LoginProps = {
  onLogin: () => void;
  onGoToRegister: () => void;
};

export default function Login({ onLogin, onGoToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setError("");

      onLogin();

      console.log("Login realizado", data);
    } catch {
      setError("E-mail ou senha inválidos");
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        
        <h1 className={styles.title}>Task Manager</h1>

        <p className={styles.subtitle}>Entre para acessar suas tarefas</p>

     

      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input className={styles.input}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button  className={styles.submitButton} type="submit">Entrar</button>
      </form>

      {error && (<p className={styles.error}>{error}</p>)}

        <div className={styles.switch}>
            <span>Não possui uma conta? </span>

            <button className={styles.linkButton} onClick={onGoToRegister}>Criar uma conta</button>
        </div>
       </section>
    </main>
  );
}
