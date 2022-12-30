import React from "react";
import { selectUsers } from "../../../state/selectors";
import { ChatContext } from "../../App";
import styles from "./UserList.module.css";
import User from "./UserView/User/User";
import UserView from "./UserView/UserView";

const UserList: React.FC = () => {
  const { state } = React.useContext(ChatContext);
  const users = selectUsers(state);

  return (
    <>
      <UserView />
      <main className={styles.main}>
        <div className={styles.header}>
          <h3>Users</h3>
        </div>
        <ul className={styles.userList}>
          {Object.values(users).map((user) => (
            <User key={user.username} username={user.username} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default UserList;
