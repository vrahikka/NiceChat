import { State } from "./reducer";

export const selectIsLoggedIn = (state: State) => !!state.username;
export const selectUsername = (state: State) => state.username;

export const selectMessages = (state: State) => state.messages;

export const selectMessage = (state: State, id: number) => state.messages[id];

export const selectIsUserMessage = (state: State, messsageUserName: string) => messsageUserName === state.username;

export const selectUsers = (state: State) => state.users;

export const selectUser = (state: State, username: string) => state.users[username];

export const selectSelectedUsername = (state: State) => state.selectedUsername;

export const selectSelectedUser = (state: State) => state.users[state.selectedUsername];

export const selectIsCurrentUser = (state: State, username: string) => state.username === username;

export const selectUsersLastMessageTimeStamp = (state: State, username: string) => {
  const reversed = [...state.messages].reverse();
  return reversed.find((message) => message.from_user === username)?.sent_at;
};
