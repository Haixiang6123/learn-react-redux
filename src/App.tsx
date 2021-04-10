import React, {ChangeEventHandler, createContext, useContext, useState} from 'react';

interface AppState {
  user: {
    name: string;
    age: number;
  }
}

interface ContextValue {
  appState: AppState,
  setAppState: Function
}

const defaultAppState: AppState = {
  user: {
    name: 'Jack',
    age: 18
  }
}

const AppContext = createContext<ContextValue>({
  appState: defaultAppState,
  setAppState: () => {}
})

const User = () => {
  const contextValue = useContext(AppContext)
  return <div>User: {contextValue.appState.user.name}</div>
}

const UserModify = () => {
  const {appState, setAppState} = useContext(AppContext)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    appState.user.name = e.target.value
    setAppState({...appState})
  }

  return (
    <div>
      <label>
        用户名
        <input type="text" value={appState.user.name} onChange={onChange}/>
      </label>
    </div>
  )
}

const FirstSon = () => {
  return (
    <section>
      大儿子
      <User/>
    </section>
  )
}

const SecondSon = () => {
  return (
    <section>
      二儿子
      <UserModify/>
    </section>
  )
}

const ThirdSon = () => {
  return <section>三儿子</section>
}

const App = () => {
  const [appState, setAppState] = useState<AppState>(defaultAppState)

  const contextValue = {appState, setAppState}

  return (
    <AppContext.Provider value={contextValue}>
      <FirstSon/>
      <SecondSon/>
      <ThirdSon/>
    </AppContext.Provider>
  );
}

export default App;
