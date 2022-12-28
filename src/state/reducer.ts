interface ChatMessage {
  from_user: string;
  sent_at: Date;
  text: string;
}

interface UserDataBase {
  username: string;
}

interface UserData extends UserDataBase {
  online?: boolean;
}

export interface State {
  username: string;
  users: Record<string, UserData>;
  messages: Array<ChatMessage>;
  selectedUsername: string;
}

const BOT_USERNAME = "Bot";
export const initialState: State = {
  username: "",
  users: {
    [BOT_USERNAME]: {
      username: BOT_USERNAME,
      online: true,
    },
  },
  messages: [
    {
      from_user: BOT_USERNAME,
      sent_at: new Date(Date.now()),
      text: "Well Hello there!",
    },
  ],
  selectedUsername: "",
};

export interface Action {
  type: string;
}

export enum ActionType {
  LogIn = "LOG_IN",
  PostNewMessage = "POST_NEW_MESSAGE",
  NewMessageReceived = "NEW_MESSAGE",
  UserLogIn = "USER_LOG_IN",
  UserLogOut = "USER_LOG_OUT",
  SetSelectedUser = "SET_SELECTED_USER",
}

export interface LogInAction extends Action {
  payload: string;
}
function isLogInAction(action: Action): action is LogInAction {
  return action.type === ActionType.LogIn;
}

export interface PostNewMessageAction extends Action {
  payload: {
    text: string;
    username?: string;
  };
}

function isPostNewMessageAction(action: Action): action is PostNewMessageAction {
  return action.type === ActionType.PostNewMessage;
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

export interface SetSelectedUserAction extends Action {
  payload: string;
}
function isSetSelectedUserAction(action: Action): action is SetSelectedUserAction {
  return action.type === ActionType.SetSelectedUser;
}

export type Actions = NewMessageAction | LogInAction | UserLogInAction | UserLogOutAction | PostNewMessageAction;

export const reducer = (state: State, action: Actions) => {
  console.log(`${action.type}`, action.payload);
  let newState = state;
  if (isSetSelectedUserAction(action)) {
    newState = { ...state, selectedUsername: action.payload };
  }
  if (isPostNewMessageAction(action)) {
    const sender = action.payload.username;
    const users = sender && sender !== state.username ? { ...state.users, [sender]: { username: sender, picture: "", online: true } } : state.users;
    newState = { ...state, users, messages: [...state.messages, { from_user: action.payload.username ?? state.username, sent_at: new Date(Date.now()), text: action.payload.text }] };
  }
  if (isUserLogOutAction(action)) {
    const user = state.users[action.payload];
    const users = { ...state.users, [action.payload]: { ...user, online: false } };
    newState = { ...state, users: users };
  }
  if (isLogInAction(action)) {
    const users = { ...state.users, [action.payload]: { username: action.payload, online: true } };
    newState = { ...state, username: action.payload, users };
  }
  if (isNewMessageAction(action)) {
    newState = { ...state, messages: [...state.messages, action.payload] };
  }
  if (isUserLogInAction(action)) {
    const users = { ...state.users, [action.payload.username]: { ...action.payload, online: true } };
    newState = { ...state, users: users };
  }

  console.log("New state:", newState);
  return newState;
};
