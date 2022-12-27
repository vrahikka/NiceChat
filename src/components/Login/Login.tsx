import React, { useState } from "react";
import InputField from "../InputField/InputField";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");

  const isNameValid = () => userName.length > 3 && userName.match(/^[a-zA-Z0-9]+$/);

  const onClick = () => {};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginModal}>
        <form className={styles.form}>
          <h1 className={styles.header}>join lobby</h1>
          <InputField id="username" label="Username" defaultValue={""} onInput={(value) => setUserName(value)} />
        </form>
        <p className={styles.infoText}> User name has to be more than 3 charachters long and cannot contain special characters.</p>
        <button autoFocus className={styles.loginButton} disabled={!isNameValid()} onClick={onClick} type="submit">
          Join Lobby
        </button>
      </div>
    </div>
  );
};
export default Login;
