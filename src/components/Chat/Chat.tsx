import React from "react";
import { selectedMessages, selectedUsername } from "../../state/selectors";
import { ChatContext } from "../App";

const Chat: React.FC = () => {
  const { dispatch, state } = React.useContext(ChatContext);

  const userName = selectedUsername(state);
  const messages = selectedMessages(state);

  return <div>{userName}</div>;
};

export default Chat;
