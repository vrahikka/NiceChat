import React, { Dispatch } from "react";
import { useReducer } from "react";
import { Actions, initialState, reducer, State } from "../state/reducer";
import { selectIsLoggedIn, selectSelectedUsername } from "../state/selectors";
import styles from "./App.module.css";
import Chat from "./Chat/Chat";
import Login from "./Login/Login";

interface ContextDefaultValue {
  state: State;
  dispatch: Dispatch<Actions> | null;
}
export const ChatContext = React.createContext<ContextDefaultValue>({ state: initialState, dispatch: null });

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const loggedIn = selectIsLoggedIn(state);
  const selectedUsername = selectSelectedUsername(state);

  const render = () => (loggedIn ? <Chat /> : <Login />);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      <div className={styles.App}>{render()}</div>;
    </ChatContext.Provider>
  );
}

export default App;
