import React, {ChangeEventHandler, createContext, useContext, useState} from 'react';

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

const reducer = (state: AppState, {type, payload}: Action<Partial<User>>) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      }
    }
  } else {
    return state
  }
}

const User = () => {
  const contextValue = useContext(AppContext)
  return <div>User: {contextValue.appState.user.name}</div>
}

const UserModify = () => {
  const {appState, setAppState} = useContext(AppContext)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAppState(reducer(appState, {
      type: 'updateUser',
      payload: {
        name: e.target.value
      }
    }))
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

const FirstSon = () => <section>大儿子 <User/></section>
const SecondSon = () => <section>二儿子<UserModify/></section>
const ThirdSon = () => <section>三儿子</section>

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
