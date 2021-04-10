import React, {ChangeEventHandler} from 'react';
import {connect, store, AppContext} from "./redux";

const selector = (state: AppState) => ({user: state.user})

const User = connect(selector)(({user}: {user: User}) => {
  console.log('User执行了' + Math.random());
  return <div>User: {user.name}</div>
})

const UserModify = connect()(({dispatch, state}: {dispatch: Function; state: AppState}) => {
  console.log('UserModify' + Math.random());

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: 'updateUser',
      payload: {
        name: e.target.value
      }
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
const ThirdSon = () => {
  console.log('三儿子执行了' + Math.random());
  return <section>三儿子</section>
}

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
