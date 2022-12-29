import React from "react";
import styles from "./User.module.css";
import avatarImage from "../../../../../icons/avatar.png";
import Dot from "../../../../Dot/Dot";
import { ChatContext } from "../../../../App";
import { selectUser } from "../../../../../state/selectors";
import { ActionType } from "../../../../../state/reducer";

interface Props {
  username: string;
}

const User: React.FC<Props> = ({ username }: Props) => {
  const { dispatch, state } = React.useContext(ChatContext);
  const { online } = selectUser(state, username);

  const onClick = () => {
    if (dispatch) {
      dispatch({ type: ActionType.SetSelectedUser, payload: username });
    }
  };

  return (
    <li className={styles.main} onClick={onClick}>
      <img className={styles.avatar} src={avatarImage} alt="avatar" />
      <p>{username}</p>
      <Dot online={online ?? false} />
    </li>
  );
};
export default User;
