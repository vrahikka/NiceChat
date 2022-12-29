import React from "react";
import { ActionType } from "../../../../state/reducer";
import { selectIsCurrentUser, selectSelectedUser, selectUsersLastMessageTimeStamp } from "../../../../state/selectors";
import { ChatContext } from "../../../App";
import Dot from "../../../Dot/Dot";
import { getTime } from "../../../utils";
import styles from "./UserView.module.css";
import avatarIcon from "../../../../icons/avatar.png";

const UserView: React.FC = () => {
  const { dispatch, state } = React.useContext(ChatContext);

  const user = selectSelectedUser(state);
  const isCurrentUser = selectIsCurrentUser(state, user?.username);
  const lastMessageTimeStamp = selectUsersLastMessageTimeStamp(state, user?.username);

  const onClose = () => {
    if (dispatch) {
      dispatch({ type: ActionType.SetSelectedUser, payload: "" });
    }
  };

  return (
    <div className={`${styles.main} ${user ? styles.open : ""}`}>
      <button className={styles.closeButton} onClick={onClose}>
        x
      </button>
      <div className={styles.container}>
        <div className={styles.group}>
          <h2 className={styles.name}>{user?.username}</h2>
          <img src={avatarIcon} alt="avatar" className={styles.avatar} />
        </div>
        {!isCurrentUser && (
          <div className={styles.onlineStatus}>
            <p>Online status:</p>
            <Dot online={!!user?.online} />
          </div>
        )}
        <div className={styles.group}>
          <p>Last message:</p>
          <time className={styles.time}>{getTime(lastMessageTimeStamp)}</time>
        </div>
      </div>
    </div>
  );
};

export default UserView;
