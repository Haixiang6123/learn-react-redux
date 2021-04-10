import React, {ChangeEventHandler, Component, createContext, useContext, useEffect, useState} from 'react';

const store: Store<{user: User}> = {
  state: {
    user: {name: 'Jack', age: 18}
  },
  setState(newState: any) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn: Function) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  }
}

const AppContext = createContext<ContextValue>(store)

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

const connect = (Component: any) => {
  return (props: any) => {
    const {state, setState} = useContext(AppContext)

    const [, update] = useState({})

    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])

    const dispatch = (action: Action) => {
      setState(reducer(state, action))
    }

    return <Component {...props} dispatch={dispatch} state={state}/>
  }
}

const User = connect(({state}: {state: AppState}) => {
  console.log('User执行了' + Math.random());
  return <div>User: {state.user.name}</div>
})

const UserModify = connect(({dispatch, state}: {dispatch: Function; state: AppState}) => {
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
