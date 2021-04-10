/// <reference types="react-scripts" />

interface Store<State> {
  getState: () => State | undefined
  dispatch: Function
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

