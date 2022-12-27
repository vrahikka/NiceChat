import React, { Dispatch } from "react";
import { useReducer } from "react";
import { Actions, initialState, reducer, State } from "../state/reducer";
import styles from "./App.module.css";
import Login from "./Login/Login";

interface ContextDefaultValue {
  state: State | null;
  dispatch: Dispatch<Actions> | null;
}
export const ChatContext = React.createContext<ContextDefaultValue>({ state: null, dispatch: null });

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const render = () => (state.loggedIn ? <p>CHAT</p> : <Login />);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      <div className={styles.App}>{render()}</div>;
    </ChatContext.Provider>
  );
}

export default App;
