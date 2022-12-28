import React from "react";
import { ActionType } from "../../../state/reducer";
import { selectIsUserMessage, selectMessage, selectUser } from "../../../state/selectors";
import { ChatContext } from "../../App";
import styles from "./Message.module.css";

interface InputProps {
  index: number;
}

const Message: React.FC<InputProps> = ({ index }) => {
  const { dispatch, state } = React.useContext(ChatContext);

  const { from_user, sent_at, text } = selectMessage(state, index);
  const { online } = { ...selectUser(state, from_user) };
  const isUserMessage = selectIsUserMessage(state, from_user);

  const getTime = () => {
    const clock = `${sent_at.getHours()}.${sent_at.getMinutes()}:${sent_at.getSeconds()}`;
    if (sent_at.getDate() === new Date(Date.now()).getDate()) return `Today, ${clock}`;
    return `${sent_at.getDate()}, ${clock}`;
  };

  const onUsernameClick = () => {
    if (dispatch) {
      dispatch({ type: ActionType.SetSelectedUser, payload: from_user });
    }
  };

  return (
    <main className={`${styles.main} ${isUserMessage ? styles.userMessage : ""}`}>
      <header className={styles.header}>
        <button className={styles.userName} onClick={onUsernameClick}>
          {from_user}
        </button>
        {online !== undefined && <div className={online ? styles.onlineDot : styles.offlineDot} />}
        <time className={styles.time}>{getTime()}</time>
      </header>
      <p className={styles.text}>{text}</p>
    </main>
  );
};

export default Message;
