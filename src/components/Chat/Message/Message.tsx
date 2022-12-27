import React from "react";
import { ActionType } from "../../../state/reducer";
import { selectIsUserMessage, selectMessage } from "../../../state/selectors";
import { ChatContext } from "../../App";
import styles from "./Message.module.css";

interface InputProps {
  index: number;
}

const Message: React.FC<InputProps> = ({ index }) => {
  const { dispatch, state } = React.useContext(ChatContext);

  const message = selectMessage(state, index);
  const isUserMessage = selectIsUserMessage(state, message.from_user);

  const getTime = () => {
    const clock = `${message.sent_at.getHours()}.${message.sent_at.getMinutes()}:${message.sent_at.getSeconds()}`;
    if (message.sent_at.getDate() === new Date(Date.now()).getDate()) return `Today, ${clock}`;
    return `${message.sent_at.getDate()}, ${clock}`;
  };

  const onUsernameClick = () => {
    if (dispatch) {
      dispatch({ type: ActionType.SetSelectedUser, payload: message.from_user });
    }
  };

  return (
    <main className={`${styles.main} ${isUserMessage ? styles.userMessage : ""}`}>
      <header className={styles.header}>
        <button className={styles.userName} onClick={onUsernameClick}>
          {message.from_user}
        </button>
        <time className={styles.time}>{getTime()}</time>
      </header>
      <p className={styles.text}>{message.text}</p>
    </main>
  );
};

export default Message;
