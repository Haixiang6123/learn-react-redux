/// <reference types="react-scripts" />

interface Action<T={}> {
  type: string;
  payload: T;
}

interface User {
  name: string;
  age: number;
}

interface AppState {
  user: User
}

interface ContextValue {
  appState: AppState,
  setAppState: Function
}

