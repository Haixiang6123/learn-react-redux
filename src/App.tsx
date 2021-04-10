import React, {ChangeEventHandler} from 'react';
import {connect, store, AppContext} from "./redux";

const selector = (state: AppState) => ({user: state.user})

const User = connect(selector)(({user}: {user: User}) => {
  console.log('User执行了' + Math.random());
  return <div>User: {user.name}</div>
})

const UserModify = connect(undefined, (dispatch: Function) => {
  return {
    updateUser: (user: Partial<User>) => dispatch({type: 'updateUser', payload: user})
  }
})(({state, updateUser}: {state: AppState; updateUser: Function}) => {
  console.log('UserModify' + Math.random());

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateUser({
      name: e.target.value
    })
  }

  return (
    <div>
      <label>
        用户名
        <input type="text" value={state.user.name} onChange={onChange}/>
      </label>
    </div>
  )
})

const FirstSon = () => {
  console.log('大儿子执行了' + Math.random());
  return <section>大儿子 <User/></section>
}
const SecondSon = () => {
  console.log('二儿子执行了' + Math.random());
  return<section>二儿子<UserModify/></section>
}
const ThirdSon = connect((state: AppState) => {
  return {group: state.group}
})(({group}: {group: Group}) => {
  console.log('三儿子执行了' + Math.random());
  return (
    <section>
      三儿子
      Group: {group.name}
    </section>
  )
})

const App = () => {
  return (
    <AppContext.Provider value={store}>
      <FirstSon/>
      <SecondSon/>
      <ThirdSon/>
    </AppContext.Provider>
  );
}

export default App;
