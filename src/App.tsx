import React, {createContext, useContext, useState} from 'react';

const AppContext = createContext({})

const User = () => {
  return <div>User</div>
}

const UserModify = () => {
  return <div>UserModify</div>
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
  const [appState, setAppState] = useState({
    user: {user: 'name', age: 18}
  })

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
