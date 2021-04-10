/// <reference types="react-scripts" />

interface Store<State> {
  state: undefined | State,
  setState: (newState: State) => void
  reducer: undefined | Function
  listeners: Function[]
  subscribe: Function
}

interface Action<T={}> {
  type: string;
  payload: T;
}

interface User {
  name: string;
  age: number;
}

interface Group {
  name: string;
}

interface AppState {
  user: User
  group: Group
}

interface ContextValue {
  state: AppState,
  setState: Function
}

