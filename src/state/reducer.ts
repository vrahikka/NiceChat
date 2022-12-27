interface ChatMessage {
  from_user: string;
  sent_at: Date;
  text: string;
}

export interface State {
  loggedIn: boolean;
  username: string;
  messages: Array<ChatMessage>;
  selectedUsername: string;
}

export const initialState: State = {
  loggedIn: false,
  username: "",
  messages: [],
  selectedUsername: "",
};

export interface Action {
  type: string;
}

export interface NewMessageAction extends Action {
  payload: ChatMessage;
}

export interface LogInAction extends Action {
  payload: string;
}

export type Actions = NewMessageAction | LogInAction;

export enum ActionType {
  LogIn = "LOG_IN",
  NewMessageReceived = "NEW_MESSAGE",
}

function isLogInAction(action: Action): action is LogInAction {
  return action.type === ActionType.LogIn;
}

function isNewMessageAction(action: Action): action is NewMessageAction {
  return action.type === ActionType.NewMessageReceived;
}

export const reducer = (state: State, action: Actions) => {
  if (isLogInAction(action)) {
    return { ...state, loggedIn: true, username: action.payload };
  }
  if (isNewMessageAction(action)) {
    return { ...state, messages: [...state.messages, action.payload] };
  }
  return state;
};
