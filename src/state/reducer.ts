interface ChatMessage {
  from_user: string;
  sent_at: Date;
  text: string;
}

interface UserDataBase {
  username: string;
  picture: string;
}

interface UserData extends UserDataBase {
  online: boolean;
}

export interface State {
  username: string;
  users: Record<string, UserData>;
  messages: Array<ChatMessage>;
  selectedUsername: string;
}

export const initialState: State = {
  username: "",
  users: {},
  messages: [],
  selectedUsername: "",
};

export interface Action {
  type: string;
}

export enum ActionType {
  LogIn = "LOG_IN",
  NewMessageReceived = "NEW_MESSAGE",
  UserLogIn = "USER_LOG_IN",
  UserLogOut = "USER_LOG_OUT",
}

export interface LogInAction extends Action {
  payload: string;
}
function isLogInAction(action: Action): action is LogInAction {
  return action.type === ActionType.LogIn;
}

export interface NewMessageAction extends Action {
  payload: ChatMessage;
}
function isNewMessageAction(action: Action): action is NewMessageAction {
  return action.type === ActionType.NewMessageReceived;
}

export interface UserLogInAction extends Action {
  payload: UserDataBase;
}
function isUserLogInAction(action: Action): action is UserLogInAction {
  return action.type === ActionType.UserLogIn;
}

export interface UserLogOutAction extends Action {
  payload: string;
}
function isUserLogOutAction(action: Action): action is UserLogOutAction {
  return action.type === ActionType.UserLogOut;
}

export type Actions = NewMessageAction | LogInAction | UserLogInAction | UserLogOutAction;

export const reducer = (state: State, action: Actions) => {
  if (isUserLogOutAction(action)) {
    const user = { ...state.users[action.payload], online: false };
    return { ...state, users: { ...state.users, user } };
  }
  if (isLogInAction(action)) {
    return { ...state, username: action.payload };
  }
  if (isNewMessageAction(action)) {
    return { ...state, messages: [...state.messages, action.payload] };
  }
  if (isUserLogInAction(action)) {
    return { ...state, users: { ...state.users, [action.payload.username]: { ...action.payload, online: true } } };
  }
  return state;
};
