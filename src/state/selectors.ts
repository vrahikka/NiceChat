import { State } from "./reducer";

export const selectIsLoggedIn = (state: State) => !!state.username;
export const selectUsername = (state: State) => state.username;

export const selectMessages = (state: State) => state.messages;

export const selectMessage = (state: State, id: number) => state.messages[id];

export const selectIsUserMessage = (state: State, messsageUserName: string) => messsageUserName === state.username;
