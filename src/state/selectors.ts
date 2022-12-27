import { State } from "./reducer";

export const selectedIsLoggedIn = (state: State) => !!state.username;
export const selectedUsername = (state: State) => state.username;

export const selectedMessages = (state: State) => state.messages;
