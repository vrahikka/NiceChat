import React, { useEffect, useState } from "react";
import { ActionType } from "../../state/reducer";
import { selectMessages, selectUsername } from "../../state/selectors";
import { ChatContext } from "../App";
import InputField from "../InputField/InputField";
import styles from "./Chat.module.css";
import Message from "./Message/Message";

const Chat: React.FC = () => {
  const { dispatch, state } = React.useContext(ChatContext);
  const [text, setText] = useState("");

  const userName = selectUsername(state);
  const messages = selectMessages(state);

  useEffect(() => {
    const objDiv = document.getElementById("messages_div");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [messages]);

  const send = (event?: React.FormEvent<HTMLFormElement>) => {
    if (dispatch) {
      dispatch({ type: ActionType.PostNewMessage, payload: text });
      setText("");
    }
    if (event && "preventDefault" in event) {
      event.preventDefault();
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p>{userName}</p>
      </header>
      <div id="messages_div" className={styles.messages}>
        {messages.map((message, index) => (
          <Message key={`${message.from_user}${index}`} index={index} />
        ))}
      </div>
      <form className={styles.inputForm} onSubmit={send}>
        <InputField id="input" value={text} onInput={(value) => setText(value)} placeholder="Text" />
        <button autoFocus className={styles.loginButton} disabled={!text} onClick={() => send}>
          Send
        </button>
      </form>
    </main>
  );
};

export default Chat;
