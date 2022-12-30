import React, { useState } from "react";
import { ActionType } from "../../state/reducer";
import { ChatContext } from "../App";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const { dispatch } = React.useContext(ChatContext);
  const [userName, setUserName] = useState("Guest123");

  const isNameValid = () => userName.length > 3 && userName.match(/^[a-zA-Z0-9]+$/);

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (dispatch) {
      dispatch({ type: ActionType.LogIn, payload: userName });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginModal}>
        <form onSubmit={onSubmit} className={styles.form}>
          <h1 className={styles.header}>Join Noice Chat</h1>
          <InputField id="username" label="Username" value={userName} onInput={(value) => setUserName(value)} />
        </form>
        <p className={styles.infoText}> User name has to be more than 3 characters long and cannot contain special characters.</p>
        <Button autoFocus text="Join Lobby" disabled={!isNameValid()} onClick={() => onSubmit()} />
      </div>
    </div>
  );
};
export default Login;
