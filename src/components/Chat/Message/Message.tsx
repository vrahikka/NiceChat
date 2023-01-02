import React from "react";
import { selectIsUserMessage, selectMessage, selectUser } from "../../../state/selectors";
import { ChatContext } from "../../App";
import Dot from "../../Dot/Dot";
import { getTime } from "../../utils";
import styles from "./Message.module.css";
import avatarImage from "../../../icons/avatar.png";

interface InputProps {
  index: number;
}

const Message: React.FC<InputProps> = ({ index }) => {
  const { state } = React.useContext(ChatContext);

  const { from_user, sent_at, text } = selectMessage(state, index);
  const { online } = { ...selectUser(state, from_user) };
  const isUserMessage = selectIsUserMessage(state, from_user);

  return (
    <main className={`${styles.main} ${isUserMessage ? styles.userMessage : ""}`}>
      <img className={styles.avatar} src={avatarImage} alt="avatar" />
      <header className={styles.header}>
        <h4>{from_user}</h4>
        {online !== undefined && <Dot online={online} />}
        <time className={styles.time}>{getTime(sent_at)}</time>
      </header>
      <p className={styles.text}>{text}</p>
    </main>
  );
};

export default Message;
