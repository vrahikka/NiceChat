import React, { useState } from "react";
import { ActionType } from "../../../state/reducer";
import { selectUsername, selectUsers } from "../../../state/selectors";
import { ChatContext } from "../../App";
import Button from "../../Button/Button";
import InputField from "../../InputField/InputField";
import styles from "./Debug.module.css";

const Debug: React.FC = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const { dispatch, state } = React.useContext(ChatContext);
  const users = selectUsers(state);
  const currentUsersName = selectUsername(state);

  const onSend = () => {
    if (dispatch) {
      dispatch({ type: ActionType.PostNewMessage, payload: { text: message, username: username } });
      setMessage("");
    }
  };

  const onClickUser = (username: string) => {
    if (dispatch) {
      const user = users[username];
      if (user.online) {
        dispatch({ type: ActionType.UserLogOut, payload: username });
      } else {
        dispatch({ type: ActionType.UserLogIn, payload: { username } });
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.group}>
        <p className={styles.info}>Send fake messages from other users</p>
        <InputField id="debug_username" onInput={(value) => setUsername(value)} value={username} label="Username" placeholder="Username" />
        <InputField id="debug_message" onInput={(value) => setMessage(value)} value={message} label="Message" placeholder="Text" />
        <Button onClick={onSend} disabled={!message || !username} text="Send" />
      </div>
      <div className={styles.group}>
        <h4>Users</h4>
        <p className={styles.info}>Toggle users online status</p>
        <ul className={styles.userList}>
          {Object.values(users)
            .filter((user) => user.username !== currentUsersName)
            .map((user) => (
              <button key={user.username} className={`${styles.button} ${user.online ? styles.button_online : styles.button_offline}`} onClick={() => onClickUser(user.username)}>
                {user.username}
              </button>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Debug;
