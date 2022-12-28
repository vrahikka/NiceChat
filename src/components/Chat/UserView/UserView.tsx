import React from "react";
import { ActionType } from "../../../state/reducer";
import { selectIsCurrentUser, selectSelectedUser, selectUsersLastMessageTimeStamp } from "../../../state/selectors";
import { ChatContext } from "../../App";
import Dot from "../../Dot/Dot";
import { getTime } from "../../utils";
import styles from "./UserView.module.css";
import avatarIcon from "../../../icons/avatar.png";

const UserView: React.FC = () => {
  const { dispatch, state } = React.useContext(ChatContext);

  const { username, online } = selectSelectedUser(state);
  const isCurrentUser = selectIsCurrentUser(state, username);
  const lastMessageTimeStamp = selectUsersLastMessageTimeStamp(state, username);

  const onClose = () => {
    if (dispatch) {
      dispatch({ type: ActionType.SetSelectedUser, payload: "" });
    }
  };

  return (
    <div className={styles.main}>
      <button className={styles.closeButton} onClick={onClose}>
        X
      </button>
      <div className={styles.container}>
        <img src={avatarIcon} alt="avatar" className={styles.avatar} />
        <p className={styles.name}>{username}</p>
        {!isCurrentUser && (
          <div className={styles.onlineStatus}>
            <p>Online status:</p>
            <Dot online={!!online} />
          </div>
        )}
        <div className={styles.lastMessage}>
          <p>Last message:</p>
          <time>{getTime(lastMessageTimeStamp)}</time>
        </div>
      </div>
    </div>
  );
};

export default UserView;
