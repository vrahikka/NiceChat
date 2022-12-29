import React, { useEffect, useState } from "react";
import { ActionType } from "../../state/reducer";
import { selectMessages, selectUsername } from "../../state/selectors";
import { ChatContext } from "../App";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import styles from "./Chat.module.css";
import Debug from "./Debug/Debug";
import Message from "./Message/Message";
import UserList from "./UserList/UserList";
import avatarImage from "../../icons/avatar.png";

const Chat: React.FC = () => {
  const { dispatch, state } = React.useContext(ChatContext);
  const [text, setText] = useState("");
  const [debug, setDebug] = useState(false);

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
      dispatch({ type: ActionType.PostNewMessage, payload: { text } });
      setText("");
    }
    if (event && "preventDefault" in event) {
      event.preventDefault();
    }
  };

  return (
    <main className={styles.main}>
      <UserList />
      <div className={styles.chatContainer}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <img className={styles.avatar} src={avatarImage} alt="avatar" />
            <p>{userName}</p>
          </div>
          <Button onClick={() => setDebug(!debug)} text="Debug" />
        </header>
        <div className={styles.content}>
          <div id="messages_div" className={styles.messages}>
            {messages.map((message, index) => (
              <Message key={`${message.from_user}${index}`} index={index} />
            ))}
          </div>
          {debug && <Debug />}
        </div>
        <form className={styles.inputForm} onSubmit={send}>
          <InputField id="input" value={text} onInput={(value) => setText(value)} placeholder="Text" />
          <Button disabled={!text} onClick={() => send()} text="Send" />
        </form>
      </div>
    </main>
  );
};

export default Chat;
